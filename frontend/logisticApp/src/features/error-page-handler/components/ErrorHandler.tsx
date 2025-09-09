import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import "./Error.css";
import ErrorPage from "./ErrorPage";

export const ErrorHandler = () => {
  const error = useRouteError();

  return isRouteErrorResponse(error) ? (
    <ErrorPage status={error.status} description={error.status} />
  ) : (
    <ErrorPage status="Ошибка" description="network" />
  );
};
