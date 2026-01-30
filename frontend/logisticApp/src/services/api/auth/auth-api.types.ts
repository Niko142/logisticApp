import type { AuthLogin, AuthRegister } from "@/types/models/auth.types";

export type LoginPayload = AuthLogin;
export type RegisterPayload = AuthRegister;

// Тип для тела запроса о регистрации
export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

// Тип для тела запроса об авторизации
export interface LoginResponse {
  token: string;
}

// Тип для тела запроса о профиле пользователя
export interface ProfileResponse {
  success: boolean;
  message: string;
  profile: RegisterResponse;
}
