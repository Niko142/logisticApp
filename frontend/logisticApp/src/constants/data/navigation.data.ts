import { Settings, User } from "lucide-react";

import type {
  NavigationProfileItem,
  NavigationItem,
} from "@/types/navigation.types";

import { APP_BASE_PATH } from "../domain";

// Основные разделы в шапке проекта
export const navigationItems: NavigationItem[] = [
  { title: "Главная", path: APP_BASE_PATH },
  { title: "Аналитика", path: `${APP_BASE_PATH}/analytics` },
  { title: "Прогнозирование", path: `${APP_BASE_PATH}/predict` },
];

export const profileUserItems: NavigationProfileItem[] = [
  { title: "Профиль", path: `${APP_BASE_PATH}/account`, icon: User },
  { title: "Настройки", path: `${APP_BASE_PATH}/settings`, icon: Settings },
];
