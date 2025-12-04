import { Settings, User } from "lucide-react";

import type {
  NavigationProfileItem,
  NavigationItem,
} from "@/types/navigation.types";

// Основные разделы в шапке проекта
export const navigationItems: NavigationItem[] = [
  { title: "Главная", path: "/app" },
  { title: "Аналитика", path: "/app/analytics" },
  { title: "Прогнозирование", path: "/app/predict" },
];

export const profileUserItems: NavigationProfileItem[] = [
  { title: "Профиль", path: "/app/account", icon: User },
  { title: "Настройки", path: "/app/settings", icon: Settings },
];
