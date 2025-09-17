// БД
export const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
export const DATABASE_PORT = parseInt(process.env.DATABASE_PORT || "5432");
export const DATABASE_NAME = process.env.DATABASE_NAME || "logisticdb";
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || "postgres";
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "123";

// JWT
export const JWT_SECRET: string = process.env.JWT_SECRET || "secret_jwt_key";
export const JWT_EXPIRES_IN: string | number =
  process.env.JWT_EXPIRES_IN || "4h";
