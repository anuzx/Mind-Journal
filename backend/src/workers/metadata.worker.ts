import { Worker, Job } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { ContentModel } from "../model/content.model.js";
import type { MetadataJobData } from "../queues/metadata.queue.js";
import { PermanentError } from "../utils/PermanentError.js";

import { extractYoutube } from "../services/youtube.service.js";
import { extractTwitter } from "../services/twitter.service.js";
import { extractLink } from "../services/link.service.js";
import { extractDocument } from "../services/document.service.js";
import { validateImageUrl } from "../services/image.service.js";
import { generateSummaryAndTags } from "../services/openrouter.service.js";

type GenerateOptions = { text: string } | { imageUrl: string };

async function buildGenerateOptions(
  type: MetadataJobData["type"],
  content: {
    link?: string | null;
    cloudinaryUrl?: string | null;
    description?: string | null;
    title?: string | null;
  },
  tweetTextFromJob?: string,
): Promise<GenerateOptions> {
  switch (type) {
    case "youtube": {
      if (!content.link) throw new PermanentError("Missing youtube link");
      try {
        return { text: await extractYoutube(content.link) };
      } catch {
        // No transcript available — fall back to title + description
        const fallback = [content.title, content.description]
          .filter(Boolean)
          .join(". ")
          .trim();
        if (fallback) return { text: fallback };
        throw new PermanentError(`No transcript and no fallback text for: ${content.link}`);
      }
    }

    case "twitter": {
      if (tweetTextFromJob && tweetTextFromJob.trim()) {
        return { text: tweetTextFromJob };
      }
      if (!content.link) throw new PermanentError("Missing twitter link");
      return { text: await extractTwitter(content.link) };
    }

    case "link": {
      if (!content.link) throw new PermanentError("Missing link URL");
      return { text: await extractLink(content.link) };
    }

    case "document": {
      if (!content.cloudinaryUrl) {
        throw new PermanentError("Missing cloudinaryUrl for document");
      }
      return { text: await extractDocument(content.cloudinaryUrl) };
    }

    case "image": {
      if (!content.cloudinaryUrl) {
        throw new PermanentError("Missing cloudinaryUrl for image");
      }
      const validUrl = await validateImageUrl(content.cloudinaryUrl);
      return { imageUrl: validUrl };
    }

    case "note": {
      if (!content.description || !content.description.trim()) {
        throw new PermanentError("Note has no description to summarize");
      }
      return { text: content.description };
    }

    default:
      throw new PermanentError(`Unknown content type: ${type}`);
  }
}

const worker = new Worker<MetadataJobData>(
  "metadata",
  async (job: Job<MetadataJobData>) => {
    const { contentId, type, tweetText } = job.data;

    const content = await ContentModel.findById(contentId);
    if (!content) {
      throw new PermanentError(`Content ${contentId} not found`);
    }

    await ContentModel.findByIdAndUpdate(contentId, {
      metadataStatus: "processing",
      $inc: { processingAttempts: 1 },
    });

    const generateOptions = await buildGenerateOptions(
      type,
      content,
      tweetText,
    );
    const { summary, tags } = await generateSummaryAndTags(generateOptions);

    const searchText = [
      content.title,
      content.description,
      summary,
      tags.join(" "),
    ]
      .filter(Boolean)
      .join(" ");

    await ContentModel.findByIdAndUpdate(contentId, {
      aiSummary: summary,
      aiTags: tags,
      searchText,
      metadataStatus: "completed",
      $unset: { metadataError: "" },
    });
  },
  {
    connection: redisConnection,
    concurrency: 3,
    lockDuration: 120_000,
    limiter: {
      max: 10,
      duration: 60_000,
    },
  },
);

worker.on("completed", (job) => {
  console.log(
    `[worker] job ${job.id} completed — contentId: ${job.data.contentId}`,
  );
});

worker.on("failed", async (job, err) => {
  if (!job) return;

  console.error(`[worker] job ${job.id} failed:`, err.message);

  const isPermanent = err instanceof PermanentError;
  const exhaustedRetries = job.attemptsMade >= (job.opts.attempts ?? 3);

  if (isPermanent || exhaustedRetries) {
    await ContentModel.findByIdAndUpdate(job.data.contentId, {
      metadataStatus: "failed",
      metadataError: err.message,
    });
  }
});

export default worker;