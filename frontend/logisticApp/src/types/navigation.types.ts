import type { LucideIcon } from "lucide-react";

interface BaseNavigationItem {
  title: string;
  path: string;
}

export type NavigationItem = BaseNavigationItem;

export interface NavigationProfileItem extends NavigationItem {
  icon?: LucideIcon;
}
