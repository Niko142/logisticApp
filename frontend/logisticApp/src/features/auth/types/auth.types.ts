import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import type { InputTypes, LayoutRoles } from "@/types/common";



export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

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
