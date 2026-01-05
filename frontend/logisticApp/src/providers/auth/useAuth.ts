import { useContext } from "react";

import type { IAuthContextType } from "./auth-context.types";
import { AuthContext } from "./AuthContext";

/**
 * Хук для получения контекста авторизации
 * @returns Контекст авторизации
 */
export const useAuth = (): IAuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Хук useAuth не может быть использован без AuthProvider");
  }
  return context;
};
