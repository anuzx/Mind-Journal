import { Bookicon } from "../icons/Bookicon";
import { Twitter } from "../icons/Twitter";
import { Youtubeicon } from "../icons/Youtubeicon";
import { Sidebaritem } from "./Sidebaritem";

export function Sidebar() {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
      <div className="flex text-2xl pt-4 items-center">
        <div className="pr-2 text-purple-600">
          <Bookicon />
        </div>
        Mind Journal
      </div>
      <div className="pt-8 pl-4">
        <Sidebaritem text="Twitter" icon={<Twitter />} />
        <Sidebaritem text="Youtube" icon={<Youtubeicon />} />
      </div>
    </div>
  );
}
