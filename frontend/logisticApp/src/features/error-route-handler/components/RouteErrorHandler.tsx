import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import ErrorDisplay from "./ErrorDisplay";
import { getStatusDescription } from "../utils/error.utils";

export const RouteErrorHandler = () => {
  const error = useRouteError();

  return isRouteErrorResponse(error) ? (
    <ErrorDisplay
      status={error.status}
      description={getStatusDescription(error.status)} // Получаем описание на основе статуса ошибки
    />
  ) : (
    <ErrorDisplay status="Ошибка" description="network" />
  );
};
