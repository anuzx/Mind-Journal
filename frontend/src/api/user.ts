import { apiClient } from "./auth";
import { useAuthStore } from "../stores/auth.store";

export type ResetPasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export async function resetPassword(data: ResetPasswordPayload) {
  const response = await apiClient.patch("/user/me/reset-password", data);
  return response.data;
}

export async function logoutUser() {
  await apiClient.post("/user/logout");
  useAuthStore.getState().clearAccessToken();
}