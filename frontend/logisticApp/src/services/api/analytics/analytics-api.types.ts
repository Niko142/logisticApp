import type {
  TimeseriesPoint,
  TrafficCategory,
} from "@/types/models/analytics.types";

export type TrafficDistributionResponse = TrafficCategory[];

export interface TrafficTimeseriesResponse {
  daily: Array<TimeseriesPoint>;
  weekly: Array<TimeseriesPoint>;
}
