import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";
import type { ContentType } from "../model/content.model.js";

export type MetadataJobData = {
  contentId: string;
  type: ContentType;
  link?: string | undefined;
  cloudinaryUrl?: string | undefined;
  tweetText?: string;
};

export const metadataQueue = new Queue<MetadataJobData>("metadata", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000, // 5s, 10s, 20s
    },
    removeOnComplete: 100, // keep last 100 completed jobs
    removeOnFail: 200, // keep last 200 failed jobs
  },
});
