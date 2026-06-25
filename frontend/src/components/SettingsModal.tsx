import { useState } from "react";
import { createPortal } from "react-dom";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { X, LogOut, KeyRound } from "lucide-react";
import { resetPassword, logoutUser } from "../api/user";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { mutate: submitReset, isPending: isResetting } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setSuccessMsg("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (err: any) => {
      setSuccessMsg(null);
      setFormError(
        err?.response?.data?.message ?? "Failed to update password.",
      );
    },
  });

  const { mutate: doLogout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      onClose();
      navigate("/signin");
    },
    onError: () => setFormError("Failed to log out. Please try again."),
  });

  function handleClose() {
    setFormError(null);
    setSuccessMsg(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError("New passwords do not match.");
      return;
    }

    submitReset({ currentPassword, newPassword, confirmPassword });
  }

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-[#0D1117] border border-white/10 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2
            className="text-lg font-medium text-[#ECE7DA]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Settings
          </h2>
          <button
            onClick={handleClose}
            className="text-[#6B7280] hover:text-[#ECE7DA] p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-2 mb-4">
            <KeyRound className="w-4 h-4 text-[#8B7CF6]" />
            <h3 className="text-sm font-medium text-[#ECE7DA]">
              Change password
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-[#ECE7DA] placeholder:text-[#6B7280] focus:outline-none focus:border-[#8B7CF6]/40 transition-colors"
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-[#ECE7DA] placeholder:text-[#6B7280] focus:outline-none focus:border-[#8B7CF6]/40 transition-colors"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-[#ECE7DA] placeholder:text-[#6B7280] focus:outline-none focus:border-[#8B7CF6]/40 transition-colors"
            />

            {formError && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {formError}
              </p>
            )}
            {successMsg && (
              <p className="text-emerald-400 text-xs bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-2">
                {successMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={isResetting}
              className="w-full mt-1 px-3 py-2.5 rounded-lg text-sm font-medium text-white bg-[#8B7CF6] hover:bg-[#7C6CE8] transition-colors disabled:opacity-60"
            >
              {isResetting ? "Updating…" : "Update password"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 border-t border-white/5" />

          {/* Logout */}
          <button
            onClick={() => doLogout()}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 border border-red-400/20 transition-all duration-150 disabled:opacity-60"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? "Signing out…" : "Log out"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}