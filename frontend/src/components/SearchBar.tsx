import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchBarProps {
  /** Called with the debounced query whenever it settles. */
  onSearch: (debouncedQuery: string) => void;
  placeholder?: string;
  /** Show a spinner on the right side (e.g. while a search request is in flight). */
  isSearching?: boolean;
  /** Debounce delay in ms. Defaults to 300. */
  debounceMs?: number;
  className?: string;
}

export function SearchBar({
  onSearch,
  placeholder = "Search by title, tag, or feeling…",
  isSearching = false,
  debounceMs = 300,
  className = "",
}: SearchBarProps) {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, debounceMs);

  // Fire onSearch only once the debounced value settles, not on every keystroke.
  useEffect(() => {
    onSearch(debouncedInput);
  }, [debouncedInput, onSearch]);

  return (
    <div className={`relative max-w-lg ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="
          w-full pl-10 pr-4 py-2.5 rounded-lg text-sm
          bg-white/5 border border-white/10
          text-[#ECE7DA] placeholder:text-[#6B7280]
          focus:outline-none focus:border-[#8B7CF6]
          transition-all duration-150
        "
      />
      {isSearching && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-[#8B7CF6] border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
}