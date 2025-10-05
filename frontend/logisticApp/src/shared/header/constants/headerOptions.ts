import { Settings, User } from "lucide-react";

import type { DropdownItemProps, HeaderProps } from "../types/header.types";

// Основные разделы в шапке проекта
export const headerNavItems: HeaderProps[] = [
  { title: "Главная", link: "/main" },
  { title: "Прогнозирование", link: "/predict" },
  { title: "Анализ", link: "/analytics" },
];

export const headerUserItems: DropdownItemProps[] = [
  { title: "Профиль", link: "/account", icon: User },
  { title: "Настройки", link: "/settings", icon: Settings },
];
