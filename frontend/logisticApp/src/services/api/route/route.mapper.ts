import type { Coordinates, RouteModel } from "@/types/models/route.types";

import type { RouteResponse } from "./route-api.types";

/**
 * Преобразование ответа от API в модель маршрута для отображения на карте
 * Алгоритм:
 * 1. Проверяем наличие features в ответе
 * 2. Итерируемся по каждому feature и проверяем его тип геометрии
 * 3. Если тип LineString, извлекаем координаты и преобразуем их из формата [lng, lat] в [lat, lng]
 * @param response - Ответ от API с данными маршрута
 * @returns Модель маршрута с координатами и общей предсказанной длительностью
 */
export const mapRouteToModel = (response: RouteResponse): RouteModel => {
  if (!response.features || response.features.length === 0) {
    return { path: [] };
  }

  const path: Coordinates[] = [];

  response.features.forEach((feature, index) => {
    if (feature.geometry.type !== "LineString") {
      return;
    }

    const coords = feature.geometry.coordinates as number[][];

    // Преобразуем GeoJSON формат [lng, lat] → Leaflet формат [lat, lng]
    const convertedCoords: Coordinates[] = coords.map(([lng, lat]) => [
      lat,
      lng,
    ]);

    if (index === 0) {
      path.push(...convertedCoords);
    } else {
      path.push(...convertedCoords.slice(1));
    }
  });

  return {
    path,
    totalTimeMin: response.summary?.total_predicted_time_min,
  };
};
