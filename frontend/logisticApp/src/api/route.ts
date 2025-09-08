import type { Coordinates, RouteResponse } from "@/types/type";
import instance from "./axios";

/**
 * Получение маршрута между двумя точками
 * @param start - Начальная точка
 * @param end - Конечная точка
 * @returns Данные маршрута
 */
export const fetchRoute = async (
  start: Coordinates,
  end: Coordinates
): Promise<RouteResponse | null> => {
  try {
    const requestBody = {
      start,
      end,
    };

    const response = await instance.post<RouteResponse>(
      "/api/route",
      requestBody
    );

    return response.data;
  } catch (err: unknown) {
    console.error("Ошибка при получении маршрута:", err);
    return null;
  }
};
