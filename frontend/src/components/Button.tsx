import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "ghost" | "danger";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses = {
  primary: "bg-[#8B7CF6] hover:bg-[#A395FF] text-[#0B0E14] font-medium",
  secondary:
    "bg-white/5 hover:bg-white/10 text-[#ECE7DA] border border-white/10 hover:border-white/20",
  ghost: "text-[#9AA0AE] hover:text-[#ECE7DA] hover:bg-white/5",
  danger:
    "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
};

const defaultStyles =
  "px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:pointer-events-none";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  loading,
  fullWidth,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full justify-center" : ""}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        startIcon && <span className="flex-shrink-0">{startIcon}</span>
      )}
      {text}
    </button>
  );
}
