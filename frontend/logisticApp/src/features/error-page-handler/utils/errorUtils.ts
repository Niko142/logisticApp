import { errorStatusMap } from "../constants/errorOptions";

// Функция для получения статуса и описания на основе типа ошибки
export const getStatusDescription = (errorCode: number | string): string => {
  if (!errorCode) return errorStatusMap.unknown;

  if (typeof errorCode === "number") {
    const key = String(errorCode);
    return errorStatusMap[key] ?? errorStatusMap.unknown;
  }

  // Если любая другая ошибка, например "network"
  return errorStatusMap[errorCode] ?? errorStatusMap.unknown;
};
