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
