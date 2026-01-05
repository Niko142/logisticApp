import { ErrorCode } from "./error.codes";

export const ERROR_MESSAGES: Record<string, string> = {
  [ErrorCode.UNAUTHORIZED]: "Требуется авторизация",
  [ErrorCode.FORBIDDEN]: "Доступ запрещен",
  [ErrorCode.NOT_FOUND]: "Страница не найдена",
  [ErrorCode.SERVER_ERROR]: "Ошибка со стороны сервера",
  [ErrorCode.SERVICE_UNAVAILABLE]: "Сервис временно недоступен",

  [ErrorCode.NETWORK_ERROR]: "Проблемы с соединением",
  [ErrorCode.AUTH_SERVER_DOWN]: "Сервис авторизации временно недоступен",
  [ErrorCode.UNKNOWN]: "Неизвестная ошибка",
};
