import type { UserProfile } from "@/types/user.types";

export type IAuthContextType = {
  status: AuthStatus;
  profile: UserProfile | null;
  login: (newToken: string) => void;
  logout: () => void;
};

export type AuthStatus =
  | "checking" // инициализация
  | "authenticated" // валидный токен/пользователь
  | "anonymous" // не валидный токен/пользователь
  | "server-down"; // сервер недоступен
