import type { CreateAxiosDefaults } from "axios";

import {
  AUTH_INSTANCE_TIMEOUT,
  ROUTE_INSTANCE_TIMEOUT,
} from "@/constants/delay";

// Конфигурация instance
const BASE_CONFIG: CreateAxiosDefaults = {
  headers: { "Content-Type": "application/json" },
};

export const AUTH_CONFIG = {
  baseURL: import.meta.env.VITE_AUTH_URL,
  timeout: AUTH_INSTANCE_TIMEOUT,
  ...BASE_CONFIG,
};

export const ROUTE_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: ROUTE_INSTANCE_TIMEOUT,
  ...BASE_CONFIG,
};
