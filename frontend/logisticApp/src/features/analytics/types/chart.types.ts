import type { TimeseriesPoint } from "@/types/models/analytics.types";

export type FilterMode = "day" | "week";

export type ChartData = TimeseriesPoint[];

export interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: TimeseriesPoint["label"];
}
