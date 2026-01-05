import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import { AppError } from "@/lib/errors/AppError";
import { getErrorDescription } from "@/lib/errors/error.utils";

import ErrorDisplay from "./ErrorDisplay";

export const ErrorHandler = () => {
  const error = useRouteError();

  if (error instanceof AppError) {
    return (
      <ErrorDisplay
        status={error.status}
        description={getErrorDescription(error.code)}
      />
    );
  }

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorDisplay
        status={error.status}
        description={getErrorDescription(error.status)}
      />
    );
  }

  return (
    <ErrorDisplay
      status="Ошибка"
      description={getErrorDescription("unknown")}
    />
  );
};
