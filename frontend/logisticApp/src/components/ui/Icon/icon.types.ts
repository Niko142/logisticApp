import type { LucideIcon } from "lucide-react";

import type { Size } from "@/types/common.types";

export type IconSize = "xs" | Size;
export type IconVariant =
  | "default"
  | "success"
  | "info"
  | "error"
  | "open"
  | "close";

export interface IconProps {
  size?: IconSize | number;
  icon: LucideIcon;
  variant?: IconVariant;
  className?: string;
  color?: string;
}
