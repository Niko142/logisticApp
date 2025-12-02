import { useCallback, useEffect, useMemo, useState } from "react";

import { getUserProfile } from "@/api";
import type { ProfileResponse } from "@/api/types";

import { AuthContext } from "./AuthContext";
import type { AuthContextProps } from "./authContext.types";

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth_token")
  ); // храним токен
  const [profile, setProfile] = useState<ProfileResponse["profile"] | null>(
    null
  ); // Данные о пользователе
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
