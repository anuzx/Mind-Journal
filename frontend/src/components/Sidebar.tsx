import { Brain } from "lucide-react";
import { DocumentsIcon } from "../icons/DocumentsIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TagIcon } from "../icons/TagIcon";
import { Twitter } from "../icons/Twitter";
import { Youtubeicon } from "../icons/Youtubeicon";
import { Sidebaritem } from "./Sidebaritem";
export function Sidebar() {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
      <div className="flex text-2xl pt-4 items-center">
        <div className="pr-2 text-purple-600">
          <Brain className="w-10 h-8" />
        </div>
        Mind Journal
      </div>

      <div className="pt-8 pl-4 flex flex-col gap-1">
        <Sidebaritem
          text="All"
          icon={<Brain />}
          to="/dashboard"
        />

        <Sidebaritem
          text="Twitter"
          icon={<Twitter />}
          to="/dashboard/twitter"
        />

        <Sidebaritem
          text="Youtube"
          icon={<Youtubeicon />}
          to="/dashboard/youtube"
        />

        <Sidebaritem
          text="Documents"
          icon={<DocumentsIcon />}
          to="/dashboard/document"
        />

        <Sidebaritem text="Links" icon={<LinkIcon />} to="/dashboard/links" />

        <Sidebaritem text="Tags" icon={<TagIcon />} to="/dashboard/tags" />
      </div>
    </div>
  );
}
