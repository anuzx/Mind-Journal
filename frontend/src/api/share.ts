import { apiClient } from "./auth";
import { BACKEND_URL, FRONTEND_URL } from "../config";
import type { Content } from "../types/content";

type ShareResponse = {
  statusCode: number;
  message: string;
  data: { hash: string };
};

type SharedVaultResponse = {
  statusCode: number;
  message: string;
  data: { username: string; content: Content[] };
};

export type SharedVault = { username: string; content: Content[] };

/**
 * POST /api/v1/mind/share — generates (or re-fetches) a public share hash
 * for the user's vault. Uses apiClient so the request automatically gets
 * the Authorization header from the Zustand auth store, and transparently
 * refreshes + retries on a 401 (see the interceptor in ./auth).
 */
export async function shareMind(): Promise<string> {
  const response = await apiClient.post<ShareResponse>("/share", {
    share: true,
  });
  const { hash } = response.data.data;

  // Points at the frontend route that renders the shared vault.
  return `${FRONTEND_URL}/share/${hash}`;
}

/**
 * GET /api/v1/mind/:hash — fetches a shared vault by its public hash.
 * This is called from the public /share/:hash page, viewed by someone who
 * is NOT logged in as the vault owner, so it intentionally uses a plain
 * fetch-style call with no auth header rather than apiClient — there's no
 * access token to attach, and we don't want a missing token to trigger
 * the 401 refresh/redirect flow meant for authenticated routes.
 */
export async function getSharedVault(hash: string): Promise<SharedVault> {
  const response = await fetch(`${BACKEND_URL}/api/v1/share/${hash}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("This share link is invalid or has been removed.");
    }
    throw new Error("Failed to load shared vault.");
  }

  const body: SharedVaultResponse = await response.json();
  return body.data;
}

/** Copies a raw link to clipboard (no backend call needed) */
export async function copyLinkToClipboard(link: string): Promise<string> {
  await navigator.clipboard.writeText(link);
  return link;
}
