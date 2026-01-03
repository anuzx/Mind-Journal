import { Bookicon } from "../icons/Bookicon";
import { Twitter } from "../icons/Twitter";
import { Youtubeicon } from "../icons/Youtubeicon";
import { Sidebaritem } from "./Sidebaritem";
import { DocumentsIcon } from "../icons/DocumentsIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TagIcon } from "../icons/TagIcon";
import { Brain } from "lucide-react";
export function Sidebar() {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
      <div className="flex text-2xl pt-4 items-center">
        <div className="pr-2 text-purple-600">
          <Brain className="w-8 h-8" />
        </div>
        Mind Journal
      </div>
      <div className="pt-8 pl-4">
        <Sidebaritem text="Twitter" icon={<Twitter />} />
        <Sidebaritem text="Youtube" icon={<Youtubeicon />} />
        <Sidebaritem text="Documents" icon={<DocumentsIcon />} />
        <Sidebaritem text="Links" icon={<LinkIcon />} />
        <Sidebaritem text="Tags" icon={<TagIcon />} />
      </div>
    </div>
  );
}
