import { useQuery } from "@tanstack/react-query";

import { analyticsService } from "@/services/api";

/**
 * Хук для получения данных о распределении загруженности дорог в текущий момент
 * @returns Результат запроса, содержащий данные о распределении загруженности по категориям
 */
export const useTrafficDistribution = () => {
  return useQuery({
    queryKey: ["traffic", "distribution"],
    queryFn: () => analyticsService.getTrafficDistribution(),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 40,
  });
};

/**
 * Хук для получения данных о динамике загруженности дорог по дням и часам
 * @returns Результат запроса, содержащий данные о динамике загруженности по дням и часам
 */
export const useTrafficTimeseries = () => {
  return useQuery({
    queryKey: ["traffic", "timeseries"],
    queryFn: () => analyticsService.getTrafficTimeseries(),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 70,
  });
};

/**
 * Хук для получения сводной информации о анализируемых метриках и их изменениях
 * @returns Результат запроса, содержащий сводную информацию о метриках загруженности
 */
export const useAnalyticsSummary = () => {
  return useQuery({
    queryKey: ["traffic", "summary"],
    queryFn: () => analyticsService.getAnalyticsSummary(),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 70,
  });
};
