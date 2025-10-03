import express from "express";

import { AuthController } from "../controllers";
import { authenticateJWT, authenticateLocal } from "../middlewares";

const router = express.Router();
const authController = new AuthController();

// Запрос на регистрацию нового пользователя
router.post("/register", authController.register.bind(authController));

// Запрос на авторизацию в системе
router.post("/login", authenticateLocal, (req, res, next) =>
  authController.login(req, res, next)
);

// Запрос на получение данных пользователя
router.get("/profile", authenticateJWT, (req, res, next) =>
  authController.openMyProfile(req, res, next)
);

export default router;
