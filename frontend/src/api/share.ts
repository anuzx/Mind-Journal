import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../config";

function authHeader() {
  return { Authorization: localStorage.getItem("access_token") ?? "" };
}

/** POST /api/v1/mind/share — generates a public share link for the user's vault */
export async function shareMind(): Promise<string> {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/mind/share`,
    { share: true },
    { headers: authHeader() },
  );
  return `${FRONTEND_URL}/api/v1/mind/${response.data.hash}`;
}

/** Copies a raw link to clipboard (no backend call needed) */
export async function copyLinkToClipboard(link: string): Promise<string> {
  await navigator.clipboard.writeText(link);
  return link;
}
