import axios from "axios";
import { BACKEND_URL } from "../config";
import type { Content } from "../types/content";

function authHeader() {
  return { Authorization: localStorage.getItem("access_token") ?? "" };
}

export enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Document = "document",
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

/** GET /api/v1/content */
export async function fetchContent(): Promise<Content[]> {
  const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
    headers: authHeader(),
  });
  return response.data.content;
}

/** POST /api/v1/content */
export async function postContent(data: ContentPayload) {
  const response = await axios.post(`${BACKEND_URL}/api/v1/content`, data, {
    headers: authHeader(),
  });
  return response.data;
}

/** GET /api/v1/content/:id */
export async function fetchContentById(id: string): Promise<Content> {
  const response = await axios.get(`${BACKEND_URL}/api/v1/content/${id}`, {
    headers: authHeader(),
  });
  return response.data.content;
}

/** PATCH /api/v1/content/:id/toggle-complete */
export async function toggleComplete(id: string): Promise<Content> {
  const response = await axios.patch(
    `${BACKEND_URL}/api/v1/content/${id}/toggle-complete`,
    {},
    { headers: authHeader() },
  );
  return response.data.content;
}

/** DELETE /api/v1/content/:id */
export async function deleteContent(id: string) {
  const response = await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
    headers: authHeader(),
  });
  return response.data;
}
