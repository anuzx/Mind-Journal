import { NavLink } from "react-router-dom";
import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  to: string;
}

export function Sidebaritem({ text, icon, to }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer
        ${
          isActive
            ? "bg-[#8B7CF6]/15 text-[#8B7CF6] border border-[#8B7CF6]/20"
            : "text-[#9AA0AE] hover:bg-white/5 hover:text-[#ECE7DA] border border-transparent"
        }`
      }
    >
      <span className="flex-shrink-0">{icon}</span>
      <span>{text}</span>
    </NavLink>
  );
}
