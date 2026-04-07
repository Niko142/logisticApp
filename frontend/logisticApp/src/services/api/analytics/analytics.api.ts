import type {
  TrafficDistributionResponse,
  TrafficTimeseriesResponse,
} from "./analytics-api.types";
import analyticsInstance from "./analytics.instance";

export const getTrafficDistribution =
  async (): Promise<TrafficDistributionResponse> => {
    const response = await analyticsInstance.get<TrafficDistributionResponse>(
      "/traffic-distribution",
    );
    return response.data;
  };

export const getTrafficTimeseries =
  async (): Promise<TrafficTimeseriesResponse> => {
    const response = await analyticsInstance.get<TrafficTimeseriesResponse>(
      "/traffic-timeseries",
    );
    return response.data;
  };
