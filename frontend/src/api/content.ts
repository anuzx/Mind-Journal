import { apiClient } from "./auth";
import type { Content } from "../types/content";

export enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Document = "document",
  Image = "image",
  Link = "link",
  Note = "note",
}

export type ContentPayload = {
  link?: string;
  title?: string;
  type: ContentType;
  description?: string;
  tags?: string[];
  dueDate?: string;
  cloudinaryUrl?: string;
  publicId?: string;
  resourceType?: "image" | "raw";
};

export type ContentPage = {
  content: Content[];
  currentPage: number;
  totalItems: number;
};


export async function fetchContent(page = 1): Promise<ContentPage> {
  const response = await apiClient.get("/content", { params: { page } });
  return response.data.data;
}

export async function postContent(data: ContentPayload) {
  const response = await apiClient.post("/content", data);
  return response.data;
}

export async function fetchContentById(id: string): Promise<Content> {
  const response = await apiClient.get(`/content/${id}`);
  return response.data.content;
}

export async function toggleComplete(id: string): Promise<Content> {
  const response = await apiClient.patch(`/content/${id}/toggle-complete`);
  return response.data.content;
}

export async function deleteContent(id: string) {
  const response = await apiClient.delete(`/content/${id}`);
  return response.data;
}
