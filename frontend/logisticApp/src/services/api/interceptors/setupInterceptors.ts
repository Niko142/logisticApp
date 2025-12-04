import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

type InterceptorOptions = {
  onUnauthorized?: () => void;
};

export function setupInterceptors<T = unknown>(
  instance: AxiosInstance,
  options?: InterceptorOptions
): AxiosInstance {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<T>) => {
      const token = localStorage.getItem("auth_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse<T>) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("auth_token");
        options?.onUnauthorized?.();
      }
      return Promise.reject(error);
    }
  );

  return instance;
}
