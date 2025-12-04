import { AxiosError, CanceledError } from "axios";

import type { AbortableOptions } from "@/types/common.types";
import type { ErrorResponse } from "@/types/error.types";

import authInstance from "./instances/auth.instance";
import type {
  LoginPayload,
  LoginResponse,
  ProfileResponse,
  RegisterPayload,
  RegisterResponse,
} from "./types/auth-api.types";

/**
 * Авторизация пользователя в системе
 * @param data - Данные для входа (логин и пароль)
 * @returns Данные авторизации и JWT-токен для осуществления доступа
 */
export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
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
  data: RegisterPayload
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
}: AbortableOptions): Promise<ProfileResponse> => {
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
