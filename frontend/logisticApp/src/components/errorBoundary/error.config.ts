import { CornerDownLeft, HomeIcon, LogIn, RefreshCcw } from "lucide-react";

import { APP_BASE_PATH, LOGIN_PATH } from "@/constants/domain";

import type { ErrorAction } from "./errorBoundary.types";

// Конфигурация опций в зависимости от статуса ошибки
export const ERROR_ACTIONS: Record<string | number, ErrorAction[]> = {
  // 401 - Пользователь не авторизован
  401: [
    {
      type: "authorization",
      label: "Войти",
      variant: "authorization",
      icon: LogIn,
      handler: (navigate) => navigate(LOGIN_PATH),
    },
  ],

  // 404 - Страницы не найдена
  404: [
    {
      type: "back",
      label: "Назад",
      variant: "back",
      icon: CornerDownLeft,
      handler: (navigate) => navigate(-1),
    },
    {
      type: "home",
      label: "На главную",
      variant: "home",
      icon: HomeIcon,
      handler: (navigate) => navigate(APP_BASE_PATH),
    },
  ],

  // 503 - Сервер недоступен или технические неполадки
  503: [
    {
      type: "home",
      label: "На главную",
      icon: HomeIcon,
      variant: "home",
      handler: (navigate) => navigate(APP_BASE_PATH),
    },
    {
      type: "reload",
      label: "Повторить попытку",
      icon: RefreshCcw,
      variant: "reload",
      handler: () => window.location.reload(),
    },
  ],

  default: [
    {
      type: "back",
      label: "Назад",
      variant: "back",
      icon: CornerDownLeft,
      handler: (navigate) => navigate(-1),
    },
    {
      type: "reload",
      label: "Повторить попытку",
      variant: "reload",
      icon: RefreshCcw,
      handler: () => window.location.reload(),
    },
  ],
};
