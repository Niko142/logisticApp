import { ErrorCode } from "./error.codes";
import { ERROR_MESSAGES } from "./error.messages";

/**
 * Возвращает описание ошибки по ее коду
 * @param errorCode - код ошибки
 * @returns Описание ошибки
 */
export const getErrorDescription = (
  errorCode: number | string | null
): string => {
  if (errorCode == null) return ERROR_MESSAGES[ErrorCode.UNKNOWN];

  return (
    ERROR_MESSAGES[errorCode as ErrorCode] ?? ERROR_MESSAGES[ErrorCode.UNKNOWN]
  );
};
