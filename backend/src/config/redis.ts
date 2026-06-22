import { config } from "./config.js";
import type { ConnectionOptions } from "bullmq";

export const redisConnection: ConnectionOptions = {
  url: config.redis_url,
};
