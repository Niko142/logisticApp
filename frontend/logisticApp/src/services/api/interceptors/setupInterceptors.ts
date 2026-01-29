import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { useAuthStore } from "@/store/auth-store";

type InterceptorOptions = {
  onUnauthorized?: () => void;
};

export function setupInterceptors<T = unknown>(
  instance: AxiosInstance,
  options?: InterceptorOptions,
): AxiosInstance {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<T>) => {
      const token = useAuthStore.getState().token;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse<T>) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().clearToken();
        options?.onUnauthorized?.();
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
