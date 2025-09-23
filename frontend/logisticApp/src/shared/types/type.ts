// Тип назначений кнопок
type ButtonVariants = "default" | "reload" | "authorization" | "back";

// Тип размера иконок
export type IconSize = "sm" | "md" | "lg" | "xl";

export interface SuccessIconProps {
  size?: IconSize;
}

export interface ButtonProps {
  variant?: ButtonVariants;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export interface headerProps {
  title: string;
  link: string;
}
