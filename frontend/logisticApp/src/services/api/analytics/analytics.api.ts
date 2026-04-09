import type {
  AnalyticsSummaryResponse,
  DistributionResponse,
  TimeseriesResponse,
} from "./analytics-api.types";
import analyticsInstance from "./analytics.instance";

class AnalyticsService {
  /**
   * Получение данных о распределении загруженности дорог
   * @returns Данные о распределении загруженности дорог по категориям
   */
  async getTrafficDistribution(): Promise<DistributionResponse> {
    const response = await analyticsInstance.get<DistributionResponse>(
      "/traffic-distribution",
    );
    return response.data;
  }

  /**
   * Получение данных о динамике загруженности дорог по дням и часам
   * @returns Данные о динамике загруженности дорог по дням и часам
   */
  async getTrafficTimeseries(): Promise<TimeseriesResponse> {
    const response = await analyticsInstance.get<TimeseriesResponse>(
      "/traffic-timeseries",
    );
    return response.data;
  }

  /**
   * Получение сводной информации о анализируемых метриках и их изменениях
   * @returns Метрики загруженности дорог и их изменения по сравнению с предыдущими периодами
   */
  async getAnalyticsSummary(): Promise<AnalyticsSummaryResponse> {
    const response =
      await analyticsInstance.get<AnalyticsSummaryResponse>("/traffic-summary");
    return response.data;
  }
}

export const analyticsService = new AnalyticsService();
