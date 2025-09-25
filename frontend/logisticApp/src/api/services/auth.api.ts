import { AxiosError } from "axios";

import authInstance from "../instances/authInstance";
import type {
  ErrorResponse,
  LoginResponse,
  RegisterResponse,
} from "../types/api.type";

import type { LoginInputs, RegisterInputs } from "@/types/common.type";

export const login = async (data: LoginInputs): Promise<LoginResponse> => {
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

export const registration = async (
  data: RegisterInputs
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
