import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";

import { authService } from "@/services/api";
import { clearToken, setToken, useToken } from "@/store/auth-store";
import type { LayoutProps } from "@/types/common.types";

import type { AuthStatus } from "./auth-context.types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: LayoutProps) => {
  const token = useToken();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: authService.getUserProfile,
    enabled: !!token,
    retry: false,
  });

  // Обработчик успешной авторизации
  const login = useCallback((newToken: string): void => {
    setToken(newToken);
  }, []);

  // Обработчик выхода из аккаунта
  const logout = useCallback((): void => {
    clearToken();
  }, []);

  useEffect(() => {
    if (isError && error instanceof Error && error.message === "UNAUTHORIZED") {
      logout();
    }
  }, [isError, error, logout]);

  const status: AuthStatus = useMemo(() => {
    if (!token) return "anonymous";
    if (isLoading) return "checking";

    if (isError && error instanceof Error) {
      if (error.message === "NETWORK_ERROR") return "server-down";
      if (error.message === "UNAUTHORIZED") return "anonymous";
    }

    if (isError) return "anonymous";

    return "authenticated";
  }, [token, isLoading, isError, error]);

  const value = useMemo(
    () => ({
      token,
      profile: data?.profile ?? null,
      status,
      login,
      logout,
    }),
    [token, data?.profile, status, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
