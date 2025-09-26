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
