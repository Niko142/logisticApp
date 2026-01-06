import type { ActionType } from "@/types/common.types";

// Тип назначений кнопок
export type ButtonVariant = ActionType | "default";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
}
