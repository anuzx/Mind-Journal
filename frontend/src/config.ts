const backend = import.meta.env.VITE_BACKEND_URL;
const frontend = import.meta.env.VITE_FRONTEND_URL;

if (!backend || !frontend) {
  throw new Error("Missing environment variables");
}

export const BACKEND_URL = backend;
export const FRONTEND_URL = frontend;