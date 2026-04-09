import type { TrafficLevel } from "../common.types";

export interface TrafficCategory {
  level: TrafficLevel;
  name: string;
  value: number;
}

export interface TimeseriesPoint {
  label: string;
  score: number;
}

export interface AnalyticsSummary {
  avg_travel_time: number;
  avg_load_percent: number;
  delta_travel_time: number;
  delta_load_percent: number;
}
