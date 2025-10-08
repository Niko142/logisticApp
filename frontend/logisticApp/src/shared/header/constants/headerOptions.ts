import { Settings, User } from "lucide-react";

import type { DropdownItemProps, HeaderProps } from "../types/header.types";

// Основные разделы в шапке проекта
export const headerNavItems: HeaderProps[] = [
  { title: "Главная", link: "/app" },
  { title: "Прогнозирование", link: "/app/predict" },
  { title: "Анализ", link: "/app/analytics" },
];

export const headerUserItems: DropdownItemProps[] = [
  { title: "Профиль", link: "/app/account", icon: User },
  { title: "Настройки", link: "/app/settings", icon: Settings },
];
