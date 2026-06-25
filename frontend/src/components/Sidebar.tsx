import {
  Brain,
  List,
  LayoutGrid,
  Youtube,
  FileText,
  Link2,
  StickyNote,
  Image,
} from "lucide-react";
import { Sidebaritem } from "./Sidebaritem";
import { FaXTwitter } from "react-icons/fa6";

export function Sidebar({ onToggle }: { onToggle: () => void }) {
  return (
    <div
      className="h-screen bg-[#0D1117] border-r border-white/5 w-64 fixed left-0 top-0 flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Brain className="w-5.5 h-7 text-[#8B7CF6]" />
          <span
            className="text-[#ECE7DA] font-medium"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Mind Journal
          </span>
        </div>
        <button
          onClick={onToggle}
          className="text-[#6B7280] hover:text-[#ECE7DA] transition-colors p-1 rounded hover:bg-white/5"
        >
          <List className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        <Sidebaritem
          text="All"
          icon={<LayoutGrid className="w-4 h-4" />}
          to="/dashboard"
        />
        <Sidebaritem
          text="Twitter"
          icon={<FaXTwitter className="w-4 h-4" />}
          to="/dashboard/twitter"
        />
        <Sidebaritem
          text="YouTube"
          icon={<Youtube className="w-4 h-4" />}
          to="/dashboard/youtube"
        />
        <Sidebaritem
          text="Documents"
          icon={<FileText className="w-4 h-4" />}
          to="/dashboard/document"
        />
        <Sidebaritem
          text="Images"
          icon={<Image className="w-4 h-4" />}
          to="/dashboard/image"
        />
        <Sidebaritem
          text="Links"
          icon={<Link2 className="w-4 h-4" />}
          to="/dashboard/link"
        />
        <Sidebaritem
          text="Notes"
          icon={<StickyNote className="w-4 h-4" />}
          to="/dashboard/note"
        />
        {/* Removed: Tags is not a content type in the schema */}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/5">
        <p className="text-xs text-[#6B7280]">© 2026 Mind Journal</p>
      </div>
    </div>
  );
}
