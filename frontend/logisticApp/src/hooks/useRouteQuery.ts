import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getRoadGraph, buildRoute } from "@/services/api";
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
    staleTime: Infinity,
  });
};

/**
 * Построение маршрута
 */
const useBuildRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["route"],
    mutationFn: ({
      startPoint,
      endPoint,
    }: {
      startPoint: Coordinates;
      endPoint: Coordinates;
    }) => buildRoute(startPoint, endPoint),

    onSuccess: (data: RouteModel) => {
      // Сохраняем текущий маршрут
      queryClient.setQueryData(["currentRoute"], data);
    },

    onError: (error: Error) => {
      console.error("Ошибка построения маршрута:", error);
    },
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
 * Полная очистка маршрута (включая отображение на карте)
 */
const useClearRoute = () => {
  const queryClient = useQueryClient();

  return () => {
    clearPoints();
    queryClient.setQueryData(["currentRoute"], null); // Очищаем маршрут в менеджере
  };
};

export const RouteQueries = {
  useRoadGraph,
  useBuildRoute,
  useCurrentRoute,
  useClearRoute,
};
