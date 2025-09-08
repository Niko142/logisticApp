import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import "./ErrorHandler.css";

export const ErrorHandler = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-page">
        <h1 className="error-page__title">Возникла ошибка</h1>
        <p className="error-page__description"></p>
        <p>
          <i>
            {error.status} {error.statusText}
          </i>
        </p>
      </div>
    );
  }

  return (
    <div className="error-page">
      <h1 className="error-page__title">Возникла ошибка</h1>
      <p className="error-page__description">Неизвестная ошибка</p>
    </div>
  );
};
