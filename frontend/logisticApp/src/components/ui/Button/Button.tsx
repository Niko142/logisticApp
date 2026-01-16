import clsx from "clsx";

import type { ButtonProps } from "./button.types";
import { btnVariants } from "./button.variants";

import "./button.css";

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
