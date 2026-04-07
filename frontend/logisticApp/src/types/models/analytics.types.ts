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
