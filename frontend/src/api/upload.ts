import axios from "axios";
import { apiClient } from "./auth";

export type CloudinaryResourceType = "image" | "raw";

type UploadSignaturePayload = {
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
  folder: string;
  resourceType: CloudinaryResourceType;
};

export type CloudinaryUploadResult = {
  cloudinaryUrl: string;
  publicId: string;
  resourceType: CloudinaryResourceType;
};


function resolveResourceType(file: File): CloudinaryResourceType {
  return file.type.startsWith("image/") ? "image" : "raw";
}


async function fetchUploadSignature(
  resourceType: CloudinaryResourceType,
): Promise<UploadSignaturePayload> {
  const response = await apiClient.get("/upload/signature", {
    params: { resourceType },
  });
  return response.data.data;
}


export async function uploadToCloudinary(
  file: File,
): Promise<CloudinaryUploadResult> {
  const resourceType = resolveResourceType(file);
  const sig = await fetchUploadSignature(resourceType);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sig.apiKey);
  formData.append("timestamp", String(sig.timestamp));
  formData.append("signature", sig.signature);
  formData.append("folder", sig.folder);


  const uploadUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/${sig.resourceType}/upload`;

  const response = await axios.post(uploadUrl, formData);

  return {
    cloudinaryUrl: response.data.secure_url,
    publicId: response.data.public_id,
    resourceType: sig.resourceType,
  };
}