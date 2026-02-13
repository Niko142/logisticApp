import { GeoJSON } from "react-leaflet";

import { RouteQueries } from "@/hooks/useRouteQuery";
import { useShowTraffic } from "@/store/route-store";

import { initTrafficStyle } from "../../utils/geo";
import { GraphOverlay } from "../overlays/GraphOverlay";

export const TrafficLayer = () => {
  const showTraffic = useShowTraffic();
  const {
    data: geoData,
    isLoading: isGraphLoading,
    isError: isGraphError,
  } = RouteQueries.useRoadGraph(); // Данные о дорожном графе

  /* Обработчик загрузки и вывода ошибки */
  if (isGraphLoading || isGraphError) {
    return (
      <GraphOverlay
        isLoading={isGraphLoading}
        error={
          isGraphError ? "Ошибка: не удалось загрузить дорожный граф!" : null
        }
      />
    );
  }

  return (
    geoData && (
      <GeoJSON
        key={showTraffic ? "traffic-on" : "traffic-off"}
        data={geoData}
        onEachFeature={initTrafficStyle(showTraffic)}
      />
    )
  );
};
