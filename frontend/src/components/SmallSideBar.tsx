import {
  Brain,
  List,
  LayoutGrid,
  Twitter,
  Youtube,
  FileText,
  Link2,
  StickyNote,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function SmallSideBar({ onToggle }: { onToggle: () => void }) {
  const items = [
    { icon: <LayoutGrid className="w-4 h-4" />, to: "/dashboard" },
    { icon: <Twitter className="w-4 h-4" />, to: "/dashboard/twitter" },
    { icon: <Youtube className="w-4 h-4" />, to: "/dashboard/youtube" },
    { icon: <FileText className="w-4 h-4" />, to: "/dashboard/document" },
    { icon: <Link2 className="w-4 h-4" />, to: "/dashboard/link" }, // fixed: was /dashboard/links
    { icon: <StickyNote className="w-4 h-4" />, to: "/dashboard/note" },
    // Removed: /dashboard/tags — not a real content type
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
    </div>
  );
}

export default SmallSideBar;
