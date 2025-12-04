import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

import type { AuthLogin, AuthRegister } from "@/types/models/auth.types";

export type ValidationConfig<T extends FieldValues> = {
  [K in Path<T>]?: RegisterOptions<T, K>;
};

export interface RegisterFormValues extends AuthRegister {
  confirmPassword: string;
}

export type LoginFormValues = AuthLogin;
