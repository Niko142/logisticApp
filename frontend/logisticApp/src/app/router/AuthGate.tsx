import { Navigate, Outlet, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import { APP_BASE_PATH, LOGIN_PATH, REGISTER_PATH } from "@/constants/domain";
import { AppError } from "@/lib/errors/AppError";
import { ErrorCode } from "@/lib/errors/error.codes";
import { useAuth } from "@/providers/auth";

// Публичные маршруты
const publicPaths = [
  "/",
  LOGIN_PATH,
  REGISTER_PATH,
  `${REGISTER_PATH}/success`,
];

export const AuthGate = () => {
  const { status } = useAuth();
  const location = useLocation();

  const isPublicPath = publicPaths.includes(location.pathname);
  const isAppPath = location.pathname.startsWith(APP_BASE_PATH);

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
      if (isPublicPath) return <Navigate to={APP_BASE_PATH} replace />;

      return <Outlet />;

    // 3. Если не авторизован и пытается в app - выбрасываем ошибку
    case "anonymous":
      return isAppPath ? <Navigate to={LOGIN_PATH} replace /> : <Outlet />;

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
