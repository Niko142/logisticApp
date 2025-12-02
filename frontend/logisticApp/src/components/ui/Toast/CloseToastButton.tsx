import { X } from "lucide-react";

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
      <X size={24} />
    </button>
  );
};
