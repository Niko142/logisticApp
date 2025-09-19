// Тип для тела запроса о регистрации
export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

// Тип для тела запроса об авторизации
export interface LoginResponse {
  token: string;
}

// Тип для тела запроса о структуре custom ошибки
export interface ErrorResponse {
  message?: string;
}
