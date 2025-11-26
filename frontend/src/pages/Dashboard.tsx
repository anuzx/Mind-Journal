import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { Plusicon } from "../icons/Plusicon";
import { Shareicon } from "../icons/Shareicon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../config";

function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modelOpen]);

  return (
    <div>
      <Sidebar />

      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
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
                }
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
          {contents.map(({ type, link, title, description }) => (
            <Card
              type={type}
              link={link}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
