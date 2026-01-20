import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../entities";

import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} from "./db";

const isProduction = process.env.ENVIRONMENT === "production";

const baseConfig = {
  logging: !isProduction,
  synchronize: false,
  entities: [User],
  migrations: isProduction ? ["dist/migrations/*.js"] : ["src/migrations/*.ts"],
  migrationsTableName: "typeorm_migrations",
};

const databaseConfig: DataSourceOptions = process.env.DATABASE_URL
  ? {
      ...baseConfig,
      type: "postgres",
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      extra: { family: 4 },
    }
  : {
      ...baseConfig,
      type: "postgres",
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      database: DATABASE_NAME,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      ssl: false,
    };

export const AppDataSource = new DataSource(databaseConfig);
