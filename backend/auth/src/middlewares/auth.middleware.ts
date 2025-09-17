import { type Request, type Response, type NextFunction } from "express";
import passport from "passport";
import type { User } from "../entities";
import type { AuthInfo } from "../types/auth.types";

// Валидация для локальной аутентификации
export const authenticateLocal = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: unknown, user: User, info: AuthInfo) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Внутренняя ошибка сервера. Повторите попытку позже",
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: info?.message || "Данные указаны неверно",
        });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};

// Опционально можно потом добавить
// export const authenticateJWT = passport.authenticate("jwt", { session: false });
