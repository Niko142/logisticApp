import type { ErrorCode } from "@/types/error.types";

import { statusMap } from "../constants/error.variants";

export const getStatusDescription = (
  errorCode: number | string | null
): string => {
  if (errorCode == null) return statusMap.unknown;

  return statusMap[String(errorCode) as ErrorCode] ?? statusMap.unknown;
};
