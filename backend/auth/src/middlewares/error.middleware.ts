import type { Request, Response, NextFunction } from "express";
import { HttpError } from "./http-error";
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Ошибка:", err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Внутренняя ошибка сервера. Попробуйте позже.",
  });
};
