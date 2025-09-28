import type { ButtonVariants } from "@/types/common";

export interface ButtonProps {
  variant?: ButtonVariants;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}
