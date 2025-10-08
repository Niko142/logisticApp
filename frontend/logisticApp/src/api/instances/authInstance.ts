import axios from "axios";

const authInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Автоматически добавляем токен к запросам
authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Обработка ошибок
authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Если получили 401, удаляем токен
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
    }
    return Promise.reject(error);
  }
);

export default authInstance;
