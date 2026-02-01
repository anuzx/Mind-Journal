import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./components/Button";
import { CreateContentModel } from "./components/CreateContentModel";
import { Sidebar } from "./components/Sidebar";
import { Plusicon } from "./icons/Plusicon";
import { Shareicon } from "./icons/Shareicon";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "./config";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [modelOpen, setModelOpen] = useState(false);
  const queryClient = useQueryClient();

  return (
    <div>
      <Sidebar />

      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
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
          ></Button>
          <Button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/mind/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                },
              );
              const shareUrl = `${FRONTEND_URL}/api/v1/mind/${response.data.hash}`;
              await navigator.clipboard.writeText(shareUrl);
            }}
            variant="secondary"
            text="Share"
            startIcon={<Shareicon />}
          ></Button>
        </div>
        {/*page content will render here*/}
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
