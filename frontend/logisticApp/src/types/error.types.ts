// Статусы ошибки
export type HttpErrorCode = "401" | "403" | "404" | "500";
export type CustomErrorCode =
  | "unauthorized"
  | "auth-server-down"
  | "network"
  | "unknown";
export type ErrorCode = HttpErrorCode | CustomErrorCode;

// Тип для тела запроса о структуре custom ошибки (переопределенный)
export interface ErrorResponse {
  message?: string;
}
