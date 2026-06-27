import axios from "axios";
import { URL } from "url";

function validateCloudinaryUrl(urlStr: string): void {
  const parsed = new URL(urlStr);
  if (!parsed.hostname.endsWith(".cloudinary.com")) {
    throw new Error("Invalid image URL");
  }
}

export async function validateImageUrl(imageUrl: string): Promise<string> {
  validateCloudinaryUrl(imageUrl);

  try {
    const response = await axios.head(imageUrl, { timeout: 10000 });
    const contentType = String(response.headers["content-type"] ?? "");

    if (!contentType.startsWith("image/")) {
      throw new Error(`URL does not point to an image: ${contentType}`);
    }
  } catch (err: any) {
    if (!err.response) throw err;
  }

  return imageUrl;
}
