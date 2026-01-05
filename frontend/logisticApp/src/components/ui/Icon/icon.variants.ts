import type { IconSize, IconVariant } from "./icon.types";

export const iconSizeVariants: Record<IconSize, number> = {
  xs: 18,
  sm: 24,
  md: 28,
  lg: 36,
  xl: 44,
};

export const colorVariants: Record<string, string> = {
  white: "var(--color-white)",
  red: "var(--color-red-400)",
  blue: "var(--color-blue-300)",
};

export const themeVariants: Record<IconVariant, string> = {
  default: "",
  success: "icon--success",
  info: "icon--info", // в процессе ...
  error: "icon--error", // в процессе ...
  open: "icon--open",
  close: "icon--close",
};
