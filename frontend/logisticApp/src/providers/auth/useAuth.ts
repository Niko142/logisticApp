import { useContext } from "react";

import type { IAuthContext } from "./auth-context.types";
import { AuthContext } from "./AuthContext";

// Гарантируем, что хук не возвращает нулевое значение, иначе ошибка
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Хук useAuth не может быть использован без AuthProvider");
  }

  return context;
};
