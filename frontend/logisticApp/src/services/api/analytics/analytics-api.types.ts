import type {
  AnalyticsSummary,
  TimeseriesPoint,
  TrafficCategory,
} from "@/types/models/analytics.types";

export type DistributionResponse = TrafficCategory[];

export interface TimeseriesResponse {
  daily: Array<TimeseriesPoint>;
  weekly: Array<TimeseriesPoint>;
}

export type AnalyticsSummaryResponse = AnalyticsSummary;
