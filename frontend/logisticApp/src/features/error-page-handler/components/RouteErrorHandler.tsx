import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import ErrorDisplay from "./ErrorDisplay";
import "./Error.css";

export const RouteErrorHandler = () => {
  const error = useRouteError();

  return isRouteErrorResponse(error) ? (
    <ErrorDisplay status={error.status} description={error.status} />
  ) : (
    <ErrorDisplay status="Ошибка" description="network" />
  );
};
