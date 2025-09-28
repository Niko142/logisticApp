import { BadgeCheck } from "lucide-react";

import type { IconSize } from "@/types/common";

import type { SuccessIconProps } from "../types/icons.types";
import "./Icon.css";

// Конфигурация размеров на основе выбранного размера из типа
const sizeMap: Record<IconSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 80,
};

export const SuccessIcon = ({ size = "md" }: SuccessIconProps) => {
  return (
    <div className="icon--success">
      <BadgeCheck size={sizeMap[size]} color="var(--white)" />
    </div>
  );
};
