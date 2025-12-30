import type { GeoSearchControl } from "leaflet-geosearch";

import type { Coordinates } from "@/types/models/route.types";

export interface TrafficGeoData {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: {
      traffic_level: number;
      [key: string]: unknown;
    };
    geometry: {
      type: "LineString";
      coordinates: number[][];
    };
  }>;
}

export interface GeoSearchOptions {
  onSelect: (coords: Coordinates) => void;
  options: ConstructorParameters<typeof GeoSearchControl>[0];
}
