import L from "leaflet";

import { getColorByTraffic } from "../utils/traffic";

export const initTrafficStyle =
  (showTraffic: boolean) =>
  (feature: GeoJSON.Feature<GeoJSON.Geometry | null>, layer: L.Layer) => {
    if ("setStyle" in layer) {
      const traffic = feature.properties?.traffic_level;

      (layer as L.Path).setStyle({
        color: showTraffic ? getColorByTraffic(traffic) : undefined,
        weight: 2,
      });
    }
  };
