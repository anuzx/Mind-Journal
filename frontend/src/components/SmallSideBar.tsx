import { useState } from "react";
import {
  Brain,
  List,
  LayoutGrid,
  Youtube,
  FileText,
  Link2,
  StickyNote,
  Image,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { SettingsModal } from "./SettingsModal";

function SmallSideBar({ onToggle }: { onToggle: () => void }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const items = [
    { icon: <LayoutGrid className="w-4 h-4" />, to: "/dashboard" },
    { icon: <FaXTwitter className="w-4 h-4" />, to: "/dashboard/twitter" },
    { icon: <Youtube className="w-4 h-4" />, to: "/dashboard/youtube" },
    { icon: <FileText className="w-4 h-4" />, to: "/dashboard/document" },
    { icon: <Image className="w-4 h-4" />, to: "/dashboard/image" },
    { icon: <Link2 className="w-4 h-4" />, to: "/dashboard/link" },
    { icon: <StickyNote className="w-4 h-4" />, to: "/dashboard/note" },
  ];

  return (
    <div className="h-screen bg-[#0D1117] border-r border-white/5 w-16 fixed left-0 top-0 flex flex-col items-center py-4 gap-4">
      {/* Logo */}
      <div className="mb-2">
        <Brain className="w-5 h-5 text-[#8B7CF6]" />
      </div>

      {/* Toggle */}
      <button
        onClick={onToggle}
        className="text-[#6B7280] hover:text-[#ECE7DA] transition-colors p-2 rounded-lg hover:bg-white/5"
      >
        <List className="w-4 h-4" />
      </button>

      {/* Nav icons */}
      <nav className="flex flex-col gap-1 flex-1">
        {items.map(({ icon, to }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `p-2.5 rounded-lg transition-all duration-150
              ${
                isActive
                  ? "bg-[#8B7CF6]/15 text-[#8B7CF6]"
                  : "text-[#6B7280] hover:bg-white/5 hover:text-[#ECE7DA]"
              }`
            }
          >
            {icon}
          </NavLink>
        ))}
      </nav>

      {/* Settings */}
      <button
        onClick={() => setSettingsOpen(true)}
        className="p-2.5 rounded-lg text-[#6B7280] hover:bg-white/5 hover:text-[#ECE7DA] transition-all duration-150"
        title="Settings"
      >
        <Settings className="w-4 h-4" />
      </button>

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}

export default SmallSideBar;