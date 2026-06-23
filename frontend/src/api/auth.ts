import axios from "axios";
import { BACKEND_URL } from "../config";
import { useAuthStore } from "../stores/auth.store";

type SignupPayload = { email: string; username: string; password: string };
type SigninPayload = { email: string; password: string };
type SigninResponse = {
  statusCode: number;
  message: string;
  data: { access_token: string };
};

export const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true, // sends the refresh_token cookie on every request
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
};
let failedQueue: QueueItem[] = [];

/** Drain the queue after a refresh attempt settles */
function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response, // 2xx – pass straight through

  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 and only retry once (_retry flag prevents infinite loops)
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If a refresh is already running, queue this request until it finishes
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      });
    }

    // Mark request as retried and kick off the refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Call the refresh endpoint — cookie is sent automatically (withCredentials)
      const { data } = await axios.post<{
        data: { newAccess_token: string };
      }>(
        `${BACKEND_URL}/api/v1/user/refresh-access-token`,
        {},
        { withCredentials: true },
      );

      const newToken = data.data.newAccess_token;

      // Persist the new token in Zustand (components stay reactive)
      useAuthStore.getState().setAccessToken(newToken);

      // Tell all queued requests about the new token
      processQueue(null, newToken);

      // Retry the original request with the fresh token
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      // Refresh itself failed (token truly expired / revoked)
      processQueue(refreshError, null);
      useAuthStore.getState().clearAccessToken();

      // Redirect to login — adjust the path to match your router setup
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export async function signupUser(data: SignupPayload) {
  const response = await apiClient.post("/user/signup", data);
  return response.data;
}

export async function signinUser(data: SigninPayload): Promise<SigninResponse> {
  const response = await apiClient.post<SigninResponse>("/user/signin", data);
  return response.data;
}

export async function logoutUser() {
  await apiClient.post("/user/logout");
  useAuthStore.getState().clearAccessToken();
}
