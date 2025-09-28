import "dotenv/config";
import express, { type Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppDataSource } from "./config";
import passport from "passport";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares";
import "./config/passport";

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:4173",
      "https://logistic-app-psi.vercel.app", // Production-домен
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false })); // Для работы с формами
app.use(helmet());
app.use(cookieParser());

app.use(passport.initialize());

app.use("/auth", authRoutes);

app.use(errorHandler);

app.get("/", (_, res) => {
  res.json({
    service: "Auth-service",
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
      console.log(`Сервер для auth-логики успешно запущен. Порт: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Ошибка при подключении к БД", err);
  });
