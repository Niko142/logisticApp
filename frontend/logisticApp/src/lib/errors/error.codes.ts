export const ErrorCode = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,

  NETWORK_ERROR: "network",
  AUTH_SERVER_DOWN: "auth-server-down",
  UNKNOWN: "unknown",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
