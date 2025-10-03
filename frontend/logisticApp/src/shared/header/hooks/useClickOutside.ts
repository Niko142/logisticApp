import { useEffect, type RefObject } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLDivElement | null>,
  fn: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        fn();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, fn]);
};
