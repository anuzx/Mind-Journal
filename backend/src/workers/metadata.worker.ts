import { Worker, Job } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { ContentModel } from "../model/content.model.js";
import type { MetadataJobData } from "../queues/metadata.queue.js";

// TODO: import these as you build each service
// import { extractYoutube } from "../services/youtube.service.js";
// import { extractTwitter } from "../services/twitter.service.js";
// import { extractLink } from "../services/link.service.js";
// import { extractDocument } from "../services/document.service.js";
// import { extractImage } from "../services/image.service.js";
// import { generateSummaryAndTags } from "../services/openrouter.service.js";

async function extractText(data: MetadataJobData): Promise<string> {
  switch (data.type) {
    case "youtube":
      // return extractYoutube(data.link!);
      return `youtube:${data.link}`;

    case "twitter":
      // return extractTwitter(data.link!);
      return `twitter:${data.link}`;

    case "link":
      // return extractLink(data.link!);
      return `link:${data.link}`;

    case "document":
      // return extractDocument(data.contentId);
      return `document:${data.contentId}`;

    case "image":
      // return extractImage(data.contentId);  <- vision model, no text extraction needed
      return `image:${data.contentId}`;

    default:
      throw new Error(`Unknown content type: ${data.type}`);
  }
}

const worker = new Worker<MetadataJobData>(
  "metadata",
  async (job: Job<MetadataJobData>) => {
    const { contentId, type } = job.data;

    // mark as processing
    await ContentModel.findByIdAndUpdate(contentId, {
      metadataStatus: "processing",
    });

    // extract text / signal for vision
    const extractedText = await extractText(job.data);

    // TODO: replace stub with real call once openrouter.service.ts is built
    // const { summary, tags } = await generateSummaryAndTags(extractedText);
    const summary = "placeholder summary";
    const tags = ["placeholder"];

    // build searchText and update document
    const content = await ContentModel.findById(contentId);
    if (!content) throw new Error(`Content ${contentId} not found`);

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
      metadataError: undefined,
    });
  },
  {
    connection: redisConnection,
    concurrency: 3, // process 3 jobs at a time
  },
);

worker.on("completed", (job) => {
  console.log(
    `[worker] job ${job.id} completed — contentId: ${job.data.contentId}`,
  );
});

worker.on("failed", async (job, err) => {
  console.error(`[worker] job ${job?.id} failed:`, err.message);

  // on final failure (all retries exhausted), mark content as failed
  if (job && job.attemptsMade >= (job.opts.attempts ?? 3)) {
    await ContentModel.findByIdAndUpdate(job.data.contentId, {
      metadataStatus: "failed",
      metadataError: err.message,
    });
  }
});

export default worker;
