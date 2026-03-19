import type { ActionType, ExportVariant } from "@/types/common.types";

// Тип назначений кнопок
export type ButtonVariant = ActionType | ExportVariant | "default";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
}
