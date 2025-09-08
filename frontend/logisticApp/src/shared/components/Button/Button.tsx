import type { ButtonProps } from "@/shared/types/type";

export const Button = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <button className="btn" onClick={onClick} {...props}>
      {children}
    </button>
  );
};
