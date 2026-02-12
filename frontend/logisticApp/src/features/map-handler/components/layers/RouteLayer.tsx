import { Polyline } from "react-leaflet";

import { RouteQueries } from "@/hooks/useRouteQuery";

import { MAP_CONFIG } from "../../config/map.config";

export const RouteLayer = () => {
  const { data: routeData } = RouteQueries.useCurrentRoute(); // Данные о  маршруте

  return routeData?.path && routeData.path.length > 0 ? (
    <Polyline
      positions={routeData.path}
      pathOptions={MAP_CONFIG.polyline.mainRoute}
    />
  ) : null;
};
