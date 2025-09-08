import type { Coordinates, RouteResponse } from "@/types/type";

export interface SearchInputProps {
  onSelect: (coordinates: Coordinates) => void;
}
// Тип для GeoJSON данных
export interface GeoData {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: {
      traffic_level: number;
      [key: string]: unknown;
    };
    geometry: {
      type: string;
      coordinates: number[][];
    };
  }>;
}

export interface LegendMapProps {
  isShow: boolean;
  onChange: () => void;
  data: RouteResponse | null;
}
