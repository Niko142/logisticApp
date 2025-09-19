import type { LoginInputs, RegisterInputs } from "@/types/type";
import { AxiosError } from "axios";
import type {
  ErrorResponse,
  LoginResponse,
  RegisterResponse,
} from "../types/api.type";
import authInstance from "../instances/authInstance";

export const login = async (data: LoginInputs): Promise<LoginResponse> => {
  try {
    const response = await authInstance.post<LoginResponse>(
      "/auth/login",
      data
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    throw new Error(error.response?.data?.message || "Ошибка авторизации");
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
    throw new Error(error.response?.data?.message || "Ошибка регистрации");
  }
};
