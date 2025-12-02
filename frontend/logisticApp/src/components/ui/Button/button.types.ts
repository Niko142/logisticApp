// Тип назначений кнопок
export type ButtonVariant = "default" | "reload" | "authorization" | "back";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
}
