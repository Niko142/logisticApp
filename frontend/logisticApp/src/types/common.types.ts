// Базовые типы размера
export type Size = "sm" | "md" | "lg" | "xl";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface AbortableOptions {
  signal: AbortSignal;
}
