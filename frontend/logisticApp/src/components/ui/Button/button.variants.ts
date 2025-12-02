import type { ButtonVariant } from "./button.types";

// Варианты стилизации кнопок в зависимости от назначения
export const btnVariants: Record<ButtonVariant, string> = {
  default: "",
  reload: "btn--reload",
  authorization: "btn--auth",
  back: "btn--back",
} as const;
