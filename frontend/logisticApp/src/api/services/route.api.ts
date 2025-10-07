import type { GeoData } from "@/features/map-handler/types";
import type { Coordinates } from "@/types/common";

import mainInstance from "../instances/mainInstance";
import type { RouteResponse } from "../types";

/**
 * Получение маршрута между двумя точками
 * @param start - Начальная точка
 * @param end - Конечная точка
 * @returns Данные маршрута
 */
export const setRoute = async (
  start: Coordinates,
  end: Coordinates
): Promise<RouteResponse | null> => {
  try {
    const response = await mainInstance.post<RouteResponse>("/api/route", {
      start,
      end,
    });

    return response.data;
  } catch (err: unknown) {
    console.error("Ошибка при получении маршрута:", err);
    return null;
  }
};

/**
 * Получение данных дорожного графа для построения маршрутов
 * @param signal - AbortSignal для отмены лишнего запроса в strict-mode
 * @returns Данные дорожного графа или в случае ошибок - null
 */
export const getRoadGraph = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<GeoData | null> => {
  try {
    const response = await mainInstance.get("/api/graph", {
      signal,
    });
    return response.data;
  } catch (err) {
    if (err instanceof Error && err.name !== "CanceledError") {
      console.error("Ошибка при получении маршрута:", err);
    }
    return null;
  }
};
