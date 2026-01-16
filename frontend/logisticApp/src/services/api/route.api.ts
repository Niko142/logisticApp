import type { AbortableOptions } from "@/types/common.types";
import type { Coordinates, RouteModel } from "@/types/models/route.types";

import routeInstance from "./instances/route.instance";
import { mapRouteToModel } from "./route.mapper";
import type {
  RouteGraphResponse,
  RouteResponse,
} from "./types/route-api.types";

// const API_ROUTING = import.meta.env.VITE_API_ROUTING_URL;

/**
 * Получение маршрута между двумя точками
 * @param startPoint - Начальная точка
 * @param endPoint - Конечная точка
 * @returns Данные маршрута, приведенные в необходимый вид через mapper
 */
export const setRoute = async (
  startPoint: Coordinates,
  endPoint: Coordinates,
): Promise<RouteModel | null> => {
  try {
    const response = await routeInstance.post<RouteResponse>("/route", {
      startPoint,
      endPoint,
    });

    return mapRouteToModel(response.data);
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
}: AbortableOptions): Promise<RouteGraphResponse | null> => {
  try {
    const response = await routeInstance.get("/graph", {
      signal,
    });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error && err.name !== "CanceledError") {
      console.error("Ошибка при получении маршрута:", err);
    }
    return null;
  }
};
