import type { AbortableOptions } from "@/types/common.types";
import type { Coordinates, RouteModel } from "@/types/models/route.types";

import type { RouteGraphResponse, RouteResponse } from "./route-api.types";
import routeInstance from "./route.instance";
import { mapRouteToModel } from "./route.mapper";

/**
 * Получение основного маршрута между двумя точками
 * @param startPoint - Начальная точка
 * @param endPoint - Конечная точка
 * @returns Данные основного маршрута, приведенные в необходимый вид через mapper
 */
export const buildRoute = async (
  startPoint: Coordinates,
  endPoint: Coordinates,
): Promise<RouteModel> => {
  const response = await routeInstance.post<RouteResponse>("/route", {
    startPoint,
    endPoint,
  });

  return mapRouteToModel(response.data.routes.main);
};

/**
 * Получение альтернативного маршрута между двумя точками
 * @param startPoint - Начальная точка
 * @param endPoint - Конечная точка
 * @returns Данные альтернативного маршрута, приведенные в необходимый вид через mapper
 */
export const buildAlternativeRoute = async (
  startPoint: Coordinates,
  endPoint: Coordinates,
): Promise<RouteModel[]> => {
  const response = await routeInstance.post<RouteResponse>(
    "/route/alternatives",
    {
      startPoint,
      endPoint,
    },
  );

  const alternatives = response.data.routes.alternatives ?? [];

  return alternatives.map(mapRouteToModel);
};

/**
 * Получение данных дорожного графа для построения маршрутов
 * @param signal - AbortSignal для отмены лишнего запроса в strict-mode
 * @returns Данные дорожного графа или в случае ошибок - null
 */
export const getRoadGraph = async ({
  signal,
}: AbortableOptions): Promise<RouteGraphResponse | null> => {
  const response = await routeInstance.get("/graph", {
    signal,
  });
  return response.data;
};
