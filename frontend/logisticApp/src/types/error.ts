// Тип для тела запроса о структуре custom ошибки (переопределенный)
export interface ErrorResponse {
  message?: string;
}

// Тип для типизации пропсов в ErrorPage
export interface ErrorPageProps {
  status: number | string;
  description: string | number;
}

// Тип для контекста ошибок
export type ErrorState = ErrorPageProps | null;
