import { useCallback, useEffect, useMemo, useState } from "react";

import { getUserProfile } from "@/services/api";
import type { LayoutProps } from "@/types/common.types";
import type { UserProfile } from "@/types/user.types";

import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: LayoutProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth_token")
  ); // храним токен
  const [profile, setProfile] = useState<UserProfile | null>(null); // Данные о пользователе
  const [isLoading, setIsLoading] = useState<boolean>(true); // Статус загрузки

  // Обработчик успешной авторизации
  const login = (newToken: string): void => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
  };

  // Обработчик выхода из аккаунта
  const logout = (): void => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setProfile(null);
  };

  // Получаем данные о профиле
  const loadProfile = useCallback(
    async (signal: AbortSignal) => {
      if (!token) return;
      try {
        setIsLoading(true);
        const userData = await getUserProfile({ signal });
        setProfile(userData.profile);
      } catch (err) {
        if (err instanceof Error && err.message !== "CanceledError") {
          console.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (!token) return;

    const controller = new AbortController();
    loadProfile(controller.signal);

    return () => controller.abort();
  }, [token, loadProfile]);

  const value = useMemo(
    () => ({
      token,
      isLoading,
      profile,
      loadProfile,
      login,
      logout,
    }),
    [token, isLoading, profile, loadProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
