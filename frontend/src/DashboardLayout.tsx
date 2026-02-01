import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { shareMind } from "./api/posts";
import { Button } from "./components/Button";
import { CreateContentModel } from "./components/CreateContentModel";
import { Sidebar } from "./components/Sidebar";
import SmallSideBar from "./components/SmallSideBar";
import { Plusicon } from "./icons/Plusicon";
import { Shareicon } from "./icons/Shareicon";


function DashboardLayout() {
  const [modelOpen, setModelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const queryClient = useQueryClient();

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  //SHARE MIND
  const shareMutation = useMutation({
    mutationFn: shareMind,
    onSuccess: async (shareUrl) => {
      await navigator.clipboard.writeText(shareUrl);
      alert("Share link copied to clipboard");
    },
    onError: () => {
      alert("Failed to generate share link");
    },
  });


  return (
    <div>
      {isSidebarOpen ? (
        <Sidebar onToggle={toggleSidebar} />
      ) : (
        <SmallSideBar onToggle={toggleSidebar} />
      )}

      <div
        className={`p-4 min-h-screen bg-gray-100 border-2 transition-all ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
            queryClient.invalidateQueries({ queryKey: ["content"] });
          }}
        />
        <div className="flex justify-end gap-4 pb-4">
          <Button
            onClick={() => {
              setModelOpen(true);
            }}
            variant="primary"
            text="Add Content"
            startIcon={<Plusicon />}
          />
          <Button
            onClick={() => shareMutation.mutate()}
            variant="secondary"
            text="Share"
            startIcon={<Shareicon />}
          />
        </div>
        {/*page content will render here*/}
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
