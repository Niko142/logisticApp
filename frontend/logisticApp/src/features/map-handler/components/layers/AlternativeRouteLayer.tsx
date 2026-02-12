import { Polyline } from "react-leaflet";

import { RouteQueries } from "@/hooks/useRouteQuery";
import { useRoutePoints, useShowAlternativeRoutes } from "@/store/route-store";

import { MAP_CONFIG } from "../../config/map.config";

export const AlternativeRouteLayer = () => {
  const points = useRoutePoints();
  const showRoutes = useShowAlternativeRoutes();

  const { data: routeData } = RouteQueries.useAlternativeRoutes(
    points[0],
    points[1],
    showRoutes,
  );

  if (!showRoutes || !routeData) return null;

  return (
    <>
      {routeData.map((route, i) => (
        <Polyline
          key={i}
          positions={route.path}
          pathOptions={MAP_CONFIG.polyline.alternativeRoute}
        />
      ))}
    </>
  );
};
