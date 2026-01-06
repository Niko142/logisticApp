// Базовые типы размера
export type Size = "sm" | "md" | "lg" | "xl";

export type ActionType = "back" | "reload" | "authorization" | "home";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface AbortableOptions {
  signal: AbortSignal;
}
