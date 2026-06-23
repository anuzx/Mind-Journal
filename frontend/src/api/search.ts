import axios from "axios";
import { BACKEND_URL } from "../config";
import type { Content } from "../types/content";

function authHeader() {
  return { Authorization: localStorage.getItem("access_token") ?? "" };
}

/** GET /api/v1/content/search?q=... */
export async function searchContent(query: string): Promise<Content[]> {
  const response = await axios.get(`${BACKEND_URL}/api/v1/content/search`, {
    headers: authHeader(),
    params: { q: query },
  });
  return response.data.content;
}
