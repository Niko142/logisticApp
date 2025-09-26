import { AxiosError } from "axios";

import type { LoginFormData, RegisterFormData } from "@/features/auth/types";
import type { ErrorResponse } from "@/types/error";

import authInstance from "../instances/authInstance";
import type { LoginResponse, RegisterResponse } from "../types/api.types";

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
