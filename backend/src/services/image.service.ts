import axios from "axios";

// Images are handled directly by the OpenRouter vision model.
// No text extraction needed — we pass the Cloudinary image URL to the AI.
// This service just validates the URL is reachable before sending it.

export async function validateImageUrl(imageUrl: string): Promise<string> {
  try {
    // HEAD request to confirm the URL is reachable and is an image
    const response = await axios.head(imageUrl, { timeout: 10000 });
    const contentType = String(response.headers["content-type"] ?? "");

    if (!contentType.startsWith("image/")) {
      throw new Error(`URL does not point to an image: ${contentType}`);
    }
  } catch (err: any) {
    // if HEAD fails (some servers block it), proceed anyway —
    // OpenRouter will fail with a clearer error if the URL is truly bad
    if (!err.response) throw err;
  }

  return imageUrl;
}
