import { X } from "lucide-react";

import { Icon } from "../Icon";

interface CloseToastButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const CloseToastButton = ({ onClick }: CloseToastButtonProps) => {
  return (
    <button
      className="btn--close"
      onClick={onClick}
      type="button"
      aria-label="Close notification"
    >
      <Icon icon={X} color="white" size="sm" />
    </button>
  );
};
