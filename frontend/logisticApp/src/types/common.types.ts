// Базовые типы размера
export type Size = "sm" | "md" | "lg" | "xl";

export type ActionType = "back" | "reload" | "authorization" | "home";

export type TrafficLevel = 0 | 1 | 2;

type ExportFormat = "pdf" | "csv";

export type ExportVariant = `export${Capitalize<ExportFormat>}`;

export interface LayoutProps {
  children: React.ReactNode;
}

export interface AbortableOptions {
  signal: AbortSignal;
}
