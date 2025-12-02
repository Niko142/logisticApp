import type { LucideIcon } from "lucide-react";

import type { Size } from "@/types/common.types";

export type IconSize = Size;
export type IconVariant = "default" | "success";

export interface IconProps {
  size: IconSize;
  icon: LucideIcon;
  variant: "";
}
