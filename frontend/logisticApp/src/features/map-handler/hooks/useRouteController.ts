import { useCallback } from "react";

import { RouteQueries } from "@/hooks/useRouteQuery";
import { addPoint } from "@/store/route-store";
import type { Coordinates } from "@/types/models/route.types";

/**
 * Хук для управления маршрутом
 * @param points - текущие точки маршрута
 * @returns объект с функцией добавления точки и флагом построения маршрута
 */
export const useRouteController = (points: Coordinates[]) => {
  const buildRoute = RouteQueries.useBuildRoute();

  const handleAddPoint = useCallback(
    (point: Coordinates) => {
      addPoint(point);

      if (points.length === 1) {
        buildRoute.mutate({
          startPoint: points[0],
          endPoint: point,
        });
      }
    },
    [points, buildRoute],
  );

  return {
    handleAddPoint,
    isBuilding: buildRoute.isPending,
  };
};
