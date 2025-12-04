import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export interface FormErrorProps {
  error?: { message?: string };
  global?: boolean;
}

export interface FormFieldProps<T extends FieldValues> {
  type?: React.HTMLInputTypeAttribute;
  name: Path<T>;
  label?: string;
  autoComplete?: "on" | "off";
  register: UseFormRegister<T>;
  error?: FieldError;
  rules?: RegisterOptions<T, Path<T>>;
  customError?: (err: FieldError | undefined) => React.ReactNode;
}
