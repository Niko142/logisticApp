import axios from "axios";
import toast from "react-hot-toast";

// Основной instance
const mainInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Формируем и добавляем токен
mainInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обработка ошибок, если пользователь не авторизирован
mainInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      toast.error("Требуется обязательная авторизация", { id: "auth_error" });
    }
    return Promise.reject(error);
  }
);

export default mainInstance;
