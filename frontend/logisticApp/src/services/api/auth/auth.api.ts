import { AxiosError, CanceledError } from "axios";

import type { AbortableOptions } from "@/types/common.types";
import type { ErrorResponse } from "@/types/error.types";

import type {
  LoginPayload,
  LoginResponse,
  ProfileResponse,
  RegisterPayload,
  RegisterResponse,
} from "./auth-api.types";
import authInstance from "./auth.instance";

class AuthService {
  /**
   * Авторизация пользователя в системе
   * @param data - Данные для входа (логин и пароль)
   * @returns Данные авторизации и JWT-токен для осуществления доступа
   */
  async loginUser(data: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await authInstance.post<LoginResponse>("/login", data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw new Error(
        error.response?.data?.message || "Соединение с сервером не установлено",
      );
    }
  }

  /**
   * Регистрация нового пользователя в системе
   * @param data - Данные для регистрации
   * @returns Данные зарегистрированного пользователя и возможность авторизации в системе
   */
  async registerUser(data: RegisterPayload): Promise<RegisterResponse> {
    try {
      const response = await authInstance.post<RegisterResponse>(
        "/register",
        data,
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw new Error(
        error.response?.data?.message || "Соединение с сервером не установлено",
      );
    }
  }

  /**
   * Получение данных в профиле текущего пользователя
   * @returns Данные профиля пользователя
   */
  async getUserProfile({ signal }: AbortableOptions): Promise<ProfileResponse> {
    try {
      const response = await authInstance.get<ProfileResponse>("/profile", {
        signal,
      });
      return response.data;
    } catch (err) {
      if (err instanceof CanceledError) {
        throw new Error("CanceledError");
      }

      const error = err as AxiosError<ErrorResponse>;

      // Сетевые ошибки (сервер недоступен)
      if (
        error.code === "ERR_NETWORK" ||
        error.code === "ERR_CONNECTION_REFUSED"
      ) {
        throw new Error("NETWORK_ERROR");
      }

      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error("UNAUTHORIZED");
      }

      throw new Error(
        error.response?.data?.message || "Не удалось загрузить профиль",
      );
    }
  }
}

export const authService = new AuthService();
