import { useEffect, useState } from "react";

import { getRoadGraph } from "@/services/api";

import type { TrafficGeoData } from "../types/geo.types";

/**
 * Хук для получения графа дорог с информацией о загруженности
 * @returns Объект с GeoJSON-данными графа дорог
 */
export const useRoadGraph = () => {
  const [geoData, setGeoData] = useState<TrafficGeoData | null>(null); // GeoJSON-данные

  useEffect(() => {
    const controller = new AbortController();

    const fetchRoadGraph = async () => {
      try {
        const response = await getRoadGraph({ signal: controller.signal });
        setGeoData(response);
      } catch (err) {
        console.error("Возникла ошибка при загрузке данных:", err);
      }
    };
    fetchRoadGraph();

    return () => controller.abort();
  }, []);

  return { geoData };
};
