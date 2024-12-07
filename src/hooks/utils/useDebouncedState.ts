import { useEffect, useState } from "react";

export default function useDebouncedState<T>(
  value: T,
  delay: number = 500,
  immediate: boolean = false
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (immediate) {
      setDebouncedValue(value);
      return;
    }
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay, immediate]);

  return debouncedValue;
}
