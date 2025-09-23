import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type InputTypes =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "date"
  | "datetime-local"
  | "number";

type LayoutRoles = "auth" | "register";

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  role: LayoutRoles;
}

export interface FormFieldProps<TFieldValues extends FieldValues> {
  id: string;
  role: LayoutRoles;
  type?: InputTypes;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  options?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  error?: FieldError;
  label?: string;
  autoComplete?: "on" | "off";
  renderError?: (error: FieldError | undefined) => React.ReactNode;
}
