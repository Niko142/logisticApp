// Тип для тела запроса о структуре custom ошибки (переопределенный)
export interface ErrorResponse {
  message?: string;
}

// Статусы ошибки
export type HttpErrorCode = "401" | "403" | "404" | "500";
export type CustomErrorCode = "network" | "unknown";
export type ErrorCode = HttpErrorCode | CustomErrorCode;

// Тип для типизации пропсов в ErrorPage
export type ErrorPageProps = Record<"status" | "description", string | number>;

// Тип для контекста ошибок
export type ErrorState = ErrorPageProps | null;
