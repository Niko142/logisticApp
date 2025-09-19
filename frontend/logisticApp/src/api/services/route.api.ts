import type { Coordinates, RouteResponse } from "@/types/type";
import mainInstance from "../instances/mainInstance";
// import instance from "../instance";

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
