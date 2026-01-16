import clsx from "clsx";

import type { IconProps } from "./icon.types";
import { iconSizeVariants, themeVariants } from "./icon.variants";

import "./icon.css";

export const Icon = ({
  size = "md",
  icon: IconComponent,
  variant = "default",
  color,
  className = "",
  ...props
}: IconProps) => {
  const iconSize = typeof size === "number" ? size : iconSizeVariants[size];

  // Если передали color явно - используем его, иначе CSS
  const iconProps = color ? { size: iconSize, color } : { size: iconSize };

  return (
    <div className={clsx("icon", themeVariants[variant], className)} {...props}>
      <IconComponent {...iconProps} />
    </div>
  );
};
