import { UnrecoverableError } from "bullmq";

/**
 * Thrown for failures that retrying will never fix — e.g. an unsupported
 * file type, a YouTube video with no transcript, a content record that
 * no longer exists.
 *
 * Extends BullMQ's UnrecoverableError rather than plain Error: BullMQ
 * checks for UnrecoverableError internally and skips retries on its own,
 * which is the replacement for the now-deprecated job.discard() call —
 * no explicit discard() needed in the worker anymore, just throw this.
 */
export class PermanentError extends UnrecoverableError {
  constructor(message: string) {
    super(message);
    this.name = "PermanentError";
  }
}
