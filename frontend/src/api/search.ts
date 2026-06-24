import type { Content } from "../types/content";
import { apiClient } from "./auth";

/** GET /api/v1/content/search?q=... */
export async function searchContent(query: string): Promise<Content[]> {
  const response = await apiClient.get(`/content/search`, {
    params: { q: query },
  });
  return response.data.data;
}
