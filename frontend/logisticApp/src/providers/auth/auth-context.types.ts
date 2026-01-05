import type { UserProfile } from "@/types/user.types";

export type IAuthContextType = {
  token: string | null;
  status: AuthStatus;
  profile: UserProfile | null;
  loadProfile: (signal: AbortSignal) => Promise<void>;
  login: (newToken: string) => void;
  logout: () => void;
};

export type AuthStatus =
  | "checking" // инициализация
  | "authenticated" // валидный токен/пользователь
  | "anonymous" // невалидный токен/пользователь
  | "server-down"; // сервер недоступен
