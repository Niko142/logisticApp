import { useCallback, useEffect, useMemo, useState } from "react";

import { getUserProfile } from "@/services/api";
import type { LayoutProps } from "@/types/common.types";
import type { UserProfile } from "@/types/user.types";

import type { AuthStatus } from "./auth-context.types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: LayoutProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth_token")
  ); // Токен авторизации
  const [profile, setProfile] = useState<UserProfile | null>(null); // Данные о пользователе
  const [status, setStatus] = useState<AuthStatus>("checking"); // Статус авторизации

  // Обработчик успешной авторизации
  const login = useCallback((newToken: string): void => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
    setStatus("checking");
  }, []);

  // Обработчик выхода из аккаунта
  const logout = useCallback((): void => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setProfile(null);
    setStatus("anonymous");
  }, []);

  // Получаем данные о профиле
  const loadProfile = useCallback(
    async (signal: AbortSignal) => {
      if (!token) {
        setStatus("anonymous");
        return;
      }

      try {
        const userData = await getUserProfile({ signal });
        setProfile(userData.profile);
        setStatus("authenticated");
      } catch (err) {
        if (err instanceof Error) {
          // Игнорируем отмену запроса
          if (err.message === "CanceledError") {
            return;
          }
          // Сетевая ошибка - сервер недоступен
          if (err.message === "NETWORK_ERROR") {
            setStatus("server-down");
            return;
          }
          // Ошибка авторизации - токен невалиден
          if (err.message === "UNAUTHORIZED") {
            logout();
            return;
          }
          logout();
        }
      }
    },
    [token, logout]
  );

  useEffect(() => {
    const controller = new AbortController();
    loadProfile(controller.signal);

    return () => controller.abort();
  }, [loadProfile]);

  const value = useMemo(
    () => ({
      token,
      profile,
      status,
      loadProfile,
      login,
      logout,
    }),
    [token, profile, status, loadProfile, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
