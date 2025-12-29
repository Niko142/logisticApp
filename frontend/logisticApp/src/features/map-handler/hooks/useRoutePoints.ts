import { useCallback, useEffect, useRef, useState } from "react";

import type { Coordinates, RouteModel } from "@/types/models/route.types";

/**
 * Хук для управления точками маршрута и его построения
 * @param fetchRoute - функция для получения начальной и конечной значений координат
 * @returns Состояние точек, данные маршрута и функции управления
 */
export const useRoutePoints = (
  fetchRoute: (
    startPoint: Coordinates,
    endPoint: Coordinates,
    signal: AbortSignal
  ) => Promise<RouteModel | null>
) => {
  const [points, setPoints] = useState<Coordinates[]>([]); // Массив координат
  const [routeData, setRouteData] = useState<RouteModel | null>(null); // Данные построенного маршрута в формате GeoJSON
  const abortControllerRef = useRef<AbortController | null>(null);

  const addPoint = useCallback(async (newPoint: Coordinates) => {
    setPoints((prev) => {
      if (prev.length === 2) {
        return [newPoint];
      }

      return [...prev, newPoint];
    });
  }, []);

  useEffect(() => {
    if (points.length !== 2) return;

    const [startPoint, endPoint] = points;

    // отменяем предыдущий запрос
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    fetchRoute(startPoint, endPoint, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setRouteData(data);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError" && err.name !== "CanceledError") {
          console.error(err);
        }
      });

    return () => controller.abort();
  }, [points, fetchRoute]);

  // Очистка всех точек и данных маршрута
  const clearRoute = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setPoints([]);
    setRouteData(null);
  }, []);

  return { points, routeData, addPoint, clearRoute };
};
