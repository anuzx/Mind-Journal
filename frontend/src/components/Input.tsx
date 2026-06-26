interface InputProps {
  placeholder: string;
  reference?: React.RefObject<HTMLInputElement | null>;
  type?: "text" | "password" | "email" | "date";
  label?: string;
}

export function Input({
  placeholder,
  reference,
  type = "text",
  label,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 my-2">
      {label && (
        <label className="text-xs text-[#9AA0AE] font-medium tracking-wide uppercase">
          {label}
        </label>
      )}
      <input
        ref={reference}
        placeholder={placeholder}
        type={type}
        className="
          w-full px-4 py-2.5 rounded-lg text-sm
          bg-white/5 border border-white/10
          text-[#ECE7DA] placeholder:text-[#6B7280]
          focus:outline-none focus:border-[#8B7CF6] focus:bg-white/8
          transition-all duration-150
        "
      />
    </div>
  );
}
