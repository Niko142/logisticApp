import type { IconSize, SuccessIconProps } from "@/shared/types/type";
import { BadgeCheck } from "lucide-react";
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

export default SuccessIcon;
