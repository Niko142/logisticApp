import { useState } from "react";

import type { RouteResponse } from "@/api/types";
import type { Coordinates } from "@/types/common";

/**
 * Хук для конверсии координат
 * @param fetchRoute - ф-ия для получения начальной и
 * конечной точек маршрута в формате [number, number]
 * @returns
 */
export const useRoutePoints = (
  fetchRoute: (
    start: Coordinates,
    end: Coordinates
  ) => Promise<RouteResponse | null>
) => {
  const [points, setPoints] = useState<Coordinates[]>([]); // Массив координат
  const [routeData, setRouteData] = useState<RouteResponse | null>(null); // Данные построенного маршрута в формате GeoJSON

  const addPoint = (newPoint: Coordinates) => {
    if (points.length === 2) {
      // Сброс и новая точка
      setPoints([newPoint]);
      setRouteData(null);
    } else {
      // Добавление точки
      const updatedPoints = [...points, newPoint];
      setPoints(updatedPoints);

      // 2 точки - передаем координаты и строим точки
      if (updatedPoints.length === 2) {
        fetchRoute(updatedPoints[0], updatedPoints[1])
          .then(setRouteData)
          .catch((err) => console.error("Ошибка маршрута:", err));
      }
    }
  };

  // Очищаем данные о маршруте или проставленные точки
  const clearRoute = () => {
    setPoints([]);
    setRouteData(null);
  };

  return { points, routeData, addPoint, clearRoute };
};
