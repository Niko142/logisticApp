export type FilterMode = "day" | "week";

export interface ChartData {
  label: string;
  score: number;
}

export interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: ChartData["label"];
}
