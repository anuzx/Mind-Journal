import { useEffect, useState } from "react";


export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the pending update if value/delay changes (or on unmount)
    // before the timeout fires.
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}