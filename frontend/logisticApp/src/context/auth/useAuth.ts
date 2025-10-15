import { useContext } from "react";

import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./authContext.types";

// Гарантируем, что хук не возвращает нулевое значение, иначе ошибка
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Хук useAuth не может быть использован без AuthProvider");
  }

  return context;
};
