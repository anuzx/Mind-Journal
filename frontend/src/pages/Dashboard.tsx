import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { Sidebar } from "../components/Sidebar";
import { BACKEND_URL, FRONTEND_URL } from "../config";
import { useContent } from "../hooks/useContent";
import { Plusicon } from "../icons/Plusicon";
import { Shareicon } from "../icons/Shareicon";

function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: contents = [],
    isLoading,
    isError,
     } = useContent();

  if (isLoading) {
    return <div className="ml-72 p-4">Loading...</div>;
  }

  if (isError) {
    return <div className="ml-72 p-4">Something went wrong</div>;
  }
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
        <div className="flex gap-4 flex-wrap ">
          {contents.map((post) => (
            <Card
              key={post._id}
              id={post._id}
              type={post.type}
              link={post.link}
              title={post.title}
              description={post.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
