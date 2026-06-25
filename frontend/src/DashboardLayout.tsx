import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Plus, Share2 } from "lucide-react";
import { shareMind } from "./api/share";
import { Button } from "./components/Button";
import { CreateContentModel } from "./components/CreateContentModel";
import { Sidebar } from "./components/Sidebar";
import SmallSideBar from "./components/SmallSideBar";

function DashboardLayout() {
  const [modelOpen, setModelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const queryClient = useQueryClient();

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  const { mutate: shareVault, isPending: isSharing } = useMutation({
    mutationFn: shareMind,
    onSuccess: async (shareUrl) => {
      await navigator.clipboard.writeText(shareUrl);
      // TODO: replace with a toast notification
      alert("Share link copied to clipboard");
    },
    onError: () => alert("Failed to generate share link"),
  });

  return (
    <div
      className="min-h-screen bg-[#0B0E14]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Inter:wght@400;500;600;700&display=swap');`}</style>

      {/* Sidebar */}
      {isSidebarOpen ? (
        <Sidebar onToggle={toggleSidebar} />
      ) : (
        <SmallSideBar onToggle={toggleSidebar} />
      )}

      {/* Main content */}
      <div
        className={`min-h-screen bg-[#0B0E14] transition-all duration-200 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex items-center justify-end gap-2 px-6 py-3 border-b border-white/5 bg-[#0B0E14]/90 backdrop-blur">
          <Button
            variant="secondary"
            text={isSharing ? "Copying…" : "Share Brain"}
            startIcon={<Share2 className="w-3.5 h-3.5" />}
            onClick={() => shareVault()}
            loading={isSharing}
          />
          <Button
            variant="primary"
            text="Add Content"
            startIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setModelOpen(true)}
          />
        </div>

        {/* Page content */}
        <div className="px-6 py-6">
          <Outlet />
        </div>
      </div>

      <CreateContentModel
        open={modelOpen}
        onClose={() => {
          setModelOpen(false);
          queryClient.invalidateQueries({ queryKey: ["content"] });
        }}
      />
    </div>
  );
}

export default DashboardLayout;