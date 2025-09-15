import "dotenv/config";
import express, { type Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false })); // Для форм
app.use(cookieParser());

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

app.listen(PORT, () => {
  console.log(`Сервер для auth-логики успешно запущен. Порт: ${PORT}`);
});
