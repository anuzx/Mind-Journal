import axios from "axios";
import { BACKEND_URL } from "../config";
import type { Content } from "../types/content";

function authHeader() {
  return { Authorization: localStorage.getItem("access_token") ?? "" };
}

/** GET /api/v1/content/notes?date=YYYY-MM-DD */
export async function fetchNotesByDate(date: string): Promise<Content[]> {
  const response = await axios.get(`${BACKEND_URL}/api/v1/content/notes`, {
    headers: authHeader(),
    params: { date },
  });
  return response.data.content;
}
