import { useEffect, type RefObject } from "react";
/**
 * Хук, предназначенный для отслеживания событий клика вне отслеживаемого элемента
 * @param ref - Ссылка на элемент из useRef
 * @param fn - callback, выполняющаяся по клику вне поля компонента
 */
export const useClickOutside = (
  ref: RefObject<HTMLDivElement | HTMLUListElement | null>,
  fn: () => void
): void => {
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
