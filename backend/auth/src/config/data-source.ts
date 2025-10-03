import "reflect-metadata";
import { DataSource } from "typeorm";

import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from "./db";
import { User } from "../entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_NAME,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  // synchronize: true, // Подумать касательно использования
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
