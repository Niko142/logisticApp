import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv-flow/config";
import express, { type Application } from "express";
import helmet from "helmet";
import passport from "passport";

import { AppDataSource } from "./config";
import "./config/passport";
import { errorHandler } from "./middlewares";
import authRoutes from "./routes/auth.routes";

const PORT = process.env.PORT || 3000; // Определяем порт для подключения

const app: Application = express();

// === CORS конфигурация ===
const corsOrigins = (process.env.CORS_ORIGINS || process.env.DEV_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// Настройки Middleware
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: corsOrigins.length ? corsOrigins : false,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: false })); // Для работы с формами
app.use(cookieParser());

app.use(passport.initialize());

app.use("/auth", authRoutes);

app.use(errorHandler);

app.get("/", (_, res) => {
  res.json({
    service: "Auth-Backend",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (_, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Auth-backend успешно запущен. Порт: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Ошибка при подключении к БД", err);
  });
