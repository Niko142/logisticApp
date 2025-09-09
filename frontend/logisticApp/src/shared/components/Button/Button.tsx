import { variantsPurpose } from "@/shared/constants/button";
import type { ButtonProps } from "@/shared/types/type";
import "./Button.css";

export const Button = ({
  variant = "default",
  children,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${variantsPurpose[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
