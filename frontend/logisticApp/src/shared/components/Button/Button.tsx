import type { ButtonProps } from "./button.types";
import { variantsPurpose } from "./config/buttonOptions";


import "./Button.css";

const Button = ({
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

export default Button;
