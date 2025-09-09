type ButtonVariants = "default" | "reload" | "authorization" | "back";

export interface ButtonProps {
  variant?: ButtonVariants;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export interface headerProps {
  title: string;
  link: string;
}
