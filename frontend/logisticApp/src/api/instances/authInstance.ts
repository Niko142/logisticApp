import axios from "axios";

const authInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Пока что базовая обработка
authInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default authInstance;
