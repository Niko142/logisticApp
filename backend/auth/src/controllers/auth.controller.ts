import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";
import type { User } from "../entities";
import { generateToken } from "../utils";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      const user = await authService.register({ username, email, password });
      res
        .status(201)
        .json({
          success: true,
          message: "Пользователь успешно зарегистрирован",
          userInfo: user,
        });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;

      const token = generateToken({
        userId: user.id,
        username: user.username,
        email: user.email,
      });

      res.status(200).json({
        success: true,
        token,
        userInfo: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  //   //TODO опционально реализовать позже
  //   async openMyProfile();
}
