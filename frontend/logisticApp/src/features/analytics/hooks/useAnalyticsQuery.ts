import { useQuery } from "@tanstack/react-query";

import { getTrafficDistribution, getTrafficTimeseries } from "@/services/api";

/**
 * Хук для получения данных о распределении загруженности дорог в текущий момент
 * @returns Результат запроса, содержащий данные о распределении загруженности по категориям
 */
export const useTrafficDistribution = () => {
  return useQuery({
    queryKey: ["traffic", "distribution"],
    queryFn: getTrafficDistribution,
    staleTime: 1000 * 60 * 30,
  });
};

/**
 * Хук для получения данных о динамике загруженности дорог по дням и часам
 * @returns Результат запроса, содержащий данные о динамике загруженности по дням и часам
 */
export const useTrafficTimeseries = () => {
  return useQuery({
    queryKey: ["traffic", "timeseries"],
    queryFn: getTrafficTimeseries,
    staleTime: 1000 * 60 * 60,
  });
};
