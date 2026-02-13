import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getRoadGraph,
  buildRoute,
  buildAlternativeRoute,
} from "@/services/api";
import { clearPoints } from "@/store/route-store";
import type { Coordinates, RouteModel } from "@/types/models/route.types";

/**
 * Загрузка дорожного графа
 */
const useRoadGraph = () => {
  return useQuery({
    queryKey: ["graph"],
    queryFn: ({ signal }) => getRoadGraph({ signal }),
    retry: 3,
    retryDelay: 3000,
    staleTime: 30 * 60 * 1000, // 30 минут
    gcTime: 6 * 60 * 60 * 1000, // 6 часов
  });
};

/**
 * Построение основного маршрута
 */
const useBuildRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["main_route"],
    mutationFn: ({
      startPoint,
      endPoint,
    }: {
      startPoint: Coordinates;
      endPoint: Coordinates;
    }) => buildRoute(startPoint, endPoint),

    onMutate: () => {
      queryClient.removeQueries({ queryKey: ["alternative_routes"] });
    },

    onSuccess: (data: RouteModel) => {
      // Сохраняем текущий маршрут
      queryClient.setQueryData(["currentRoute"], data);
    },
  });
};

/**
 * Построение альтернативного маршрута (на основе текущего)
 */
const useAlternativeRoutes = (
  startPoint?: Coordinates,
  endPoint?: Coordinates,
  enabled?: boolean,
) => {
  return useQuery<RouteModel[]>({
    queryKey: ["alternative_routes", startPoint, endPoint],
    queryFn: () => buildAlternativeRoute(startPoint!, endPoint!),
    enabled: enabled && !!startPoint && !!endPoint,
    staleTime: Infinity,
  });
};

/**
 * Получение текущего маршрута из кеша
 */
const useCurrentRoute = () => {
  return useQuery<RouteModel | null>({
    queryKey: ["currentRoute"],
    queryFn: () => null,
    enabled: false,
    initialData: null,
  });
};

/**
 * Полная очистка данных маршрута из кеша
 */
const useClearRoute = () => {
  const queryClient = useQueryClient();

  return () => {
    clearPoints();
    // Очищаем маршруты в менеджере
    queryClient.removeQueries({ queryKey: ["currentRoute"] });
    queryClient.removeQueries({ queryKey: ["alternative_routes"] });
    // Сбрасываем основной маршрут, чтобы не было "зависших" данных
    queryClient.resetQueries({ queryKey: ["main_route"] });
  };
};

export const RouteQueries = {
  useRoadGraph,
  useBuildRoute,
  useAlternativeRoutes,
  useCurrentRoute,
  useClearRoute,
};
