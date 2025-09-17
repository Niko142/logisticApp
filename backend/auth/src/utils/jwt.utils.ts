import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config";
import type { JwtPayload } from "../types/jwt.types";

// Создание токена
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(
    payload,
    JWT_SECRET as Secret,
    {
      expiresIn: JWT_EXPIRES_IN,
    } as SignOptions
  );
};

// Подтверждение токена
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
