import { GeoJSON } from "react-leaflet";

import { RouteQueries } from "@/hooks/useRouteQuery";
import { useShowTraffic } from "@/store/route-store";

import { initTrafficStyle } from "../../utils/geo";
import { MapOverlay } from "../MapOverlay";

export const TrafficLayer = () => {
  const showTraffic = useShowTraffic();
  const {
    data: geoData,
    isLoading: isGraphLoading,
    isError: isGraphError,
  } = RouteQueries.useRoadGraph(); // Данные о дорожном графе

  /* Обработчик загрузки и вывода ошибки */
  if (isGraphLoading) {
    return <MapOverlay type="pending" />;
  }
  if (isGraphError) {
    <MapOverlay
      type="error"
      message="Ошибка: не удалось загрузить дорожный граф!"
    />;
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
