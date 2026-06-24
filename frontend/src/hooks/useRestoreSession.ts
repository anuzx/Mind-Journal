import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useAuthStore } from "../stores/auth.store";

export function useRestoreSession() {
  const [isRestoring, setIsRestoring] = useState(true);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  useEffect(() => {
    async function restore() {
      try {
        const { data } = await axios.post(
          `${BACKEND_URL}/api/v1/user/refresh-access-token`,
          {},
          { withCredentials: true },
        );
        setAccessToken(data.data.newAccess_token);
      } catch {
        // No valid refresh token cookie — user needs to sign in
      } finally {
        setIsRestoring(false);
      }
    }
    restore();
  }, []);

  return { isRestoring };
}
