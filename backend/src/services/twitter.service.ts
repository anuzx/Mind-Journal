export async function extractTwitter(tweetText?: string): Promise<string> {
  return tweetText?.trim() ?? "";
}
