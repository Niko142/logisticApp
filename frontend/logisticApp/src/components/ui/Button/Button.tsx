import clsx from "clsx";

import type { ButtonProps } from "./button.types";
import { btnVariants } from "./button.variants";

import "./Button.css";

const Button = ({
  variant = "default",
  children,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx("btn", btnVariants[variant])}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
