import { AxiosError, CanceledError } from "axios";

import type { LoginFormData, RegisterFormData } from "@/features/auth/types";
import type { ErrorResponse } from "@/types/error";

import authInstance from "../instances/authInstance";
import type {
  LoginResponse,
  ProfileResponse,
  RegisterResponse,
} from "../types/api.types";

/**
 * Авторизация пользователя в системе
 * @param data - Данные для входа (логин и пароль)
 * @returns Данные авторизации и JWT-токен для осуществления доступа
 */
export const loginUser = async (
  data: LoginFormData
): Promise<LoginResponse> => {
  try {
    const response = await authInstance.post<LoginResponse>(
      "/auth/login",
      data
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    throw new Error(
      error.response?.data?.message || "Соединение с сервером не установлено"
    );
  }
};

/**
 * Регистрация нового пользователя в системе
 * @param data - Данные для регистрации
 * @returns Данные зарегистрированного пользователя и возможность авторизации в системе
 */
export const registerUser = async (
  data: RegisterFormData
): Promise<RegisterResponse> => {
  try {
    const response = await authInstance.post<RegisterResponse>(
      "/auth/register",
      data
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    throw new Error(
      error.response?.data?.message || "Соединение с сервером не установлено"
    );
  }
};

/**
 * Получение данных в профиле текущего пользователя
 * @returns Данные профиля пользователя
 */
export const getUserProfile = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<ProfileResponse> => {
  try {
    const response = await authInstance.get<ProfileResponse>("/auth/profile", {
      signal,
    });
    return response.data;
  } catch (err) {
    if (err instanceof CanceledError) {
      throw new Error("CanceledError");
    }

    const error = err as AxiosError<ErrorResponse>;
    throw new Error(
      error.response?.data?.message || "Не удалось загрузить профиль"
    );
  }
};
