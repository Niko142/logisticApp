import { Navigate, Outlet, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import { AppError } from "@/lib/errors/AppError";
import { ErrorCode } from "@/lib/errors/error.codes";
import { useAuth } from "@/providers/auth";

const publicPaths = ["/", "/login", "/register", "/register/success"]; // Публичные маршруты

export const AuthGate = () => {
  const { status } = useAuth();
  const location = useLocation();

  const isPublicPath = publicPaths.includes(location.pathname);
  const isAppPath = location.pathname.startsWith("/app");

  switch (status) {
    // 1. Инициация статуса загрузки
    case "checking":
      return (
        <div className="loader">
          <BeatLoader size={20} margin={5} color="var(--color-blue-300)" />;
        </div>
      );

    // 2. Если авторизован и на публичной странице - редирект в app
    case "authenticated":
      if (isPublicPath) {
        return <Navigate to="/app" replace />;
      }
      return <Outlet />;

    // 3. Если не авторизован и пытается в app - выбрасываем ошибку
    case "anonymous":
      if (isAppPath) {
        return <Navigate to="/login" replace />;
      }
      return <Outlet />;

    // 4. Если сервер недоступен и пытается в app - выбрасываем ошибку
    case "server-down":
      if (isAppPath) {
        throw new AppError(
          ErrorCode.AUTH_SERVER_DOWN,
          503,
          "Сервер авторизации временно недоступен",
        );
      }
      return <Outlet />;

    // 5. Прочие неизвестные возникшие ошибки
    default:
      throw new AppError(ErrorCode.UNKNOWN, 500, "Неизвестная ошибка");
  }
};
