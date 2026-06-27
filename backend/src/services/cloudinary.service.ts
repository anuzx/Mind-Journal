import { cloudinary } from "../config/cloudinary.config.js";
import { config } from "../config/config.js";

export type CloudinaryResourceType = "image" | "raw";

type SignatureParams = {
  userId: string;
  resourceType: CloudinaryResourceType;
};

type SignatureResult = {
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
  folder: string;
  resourceType: CloudinaryResourceType;
};

export function generateUploadSignature({
  userId,
  resourceType,
}: SignatureParams): SignatureResult {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = `mindjournal/${userId}`;

  const allowedFormats = resourceType === "image"
    ? "jpg,jpeg,png,gif,webp"
    : "pdf,doc,docx,txt,ppt,pptx";

  const paramsToSign: Record<string, string | number> = {
    timestamp,
    folder,
    bytes: 10 * 1024 * 1024,
    allowed_formats: allowedFormats,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    config.cloudinary_api_secret,
  );

  return {
    signature,
    timestamp,
    cloudName: config.cloudinary_cloud_name,
    apiKey: config.cloudinary_api_key,
    folder,
    resourceType,
  };
}

export async function deleteCloudinaryAsset(
  publicId: string,
  resourceType: CloudinaryResourceType = "image",
): Promise<void> {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      console.warn(
        `[cloudinary] unexpected destroy result for ${publicId}:`,
        result.result,
      );
    }
  } catch (err: any) {
    console.error(`[cloudinary] failed to delete ${publicId}:`, err.message);
  }
}
