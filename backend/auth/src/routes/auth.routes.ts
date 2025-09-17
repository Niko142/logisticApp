import express from "express";
import { AuthController } from "../controllers";
import { authenticateLocal } from "../middlewares";

const router = express.Router();
const authController = new AuthController();

// Запрос на регистрацию нового пользователя
router.post("/register", authController.register.bind(authController));

// Запрос на авторизацию в системе
router.post("/login", authenticateLocal, (req, res, next) =>
  authController.login(req, res, next)
);

export default router;

// router.get("/profile");
