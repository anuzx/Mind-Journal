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
        `
        flex py-4 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150
        ${
          isActive
            ? "bg-gray-200 text-purple-600"
            : "hover:bg-gray-200 text-gray-700"
        }
        `
      }
    >
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </NavLink>
  );
}
