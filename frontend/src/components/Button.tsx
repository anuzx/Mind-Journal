import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon: ReactElement;
  onClick?: () => void;
  loading?: boolean
}

const variantCLasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";
//we are rendering two inline items next to each other so we did flex to get them side by side

export function Button({ variant, text, startIcon , onClick , loading}: ButtonProps) {
  return (
    <button onClick={onClick} className={`${variantCLasses[variant]} ${defaultStyles}`}>
      <div className="pr-2">{startIcon}</div>

      {text}
    </button>
  );
}
