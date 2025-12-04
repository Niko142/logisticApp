import type { RouteLine } from "@/types/models/route.types";

type RouteSummary = {
  total_predicted_time_min: number;
  [key: string]: unknown;
};

export interface RouteResponse {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: Record<string, unknown>;
    geometry: {
      type: string;
      coordinates: RouteLine[] | RouteLine;
    };
  }>;
  summary?: RouteSummary;
}
