// Тип для геометрии маршрута, получаемой от API
export interface RouteFeature {
  type: "Feature";
  geometry: {
    type: "LineString";
    coordinates: number[][];
  };
  properties: Record<string, unknown>;
}

// Тип для ответа от API при запросе маршрута
export interface RouteApiModel {
  features: RouteFeature[];
  summary: {
    total_length_km: number;
    total_predicted_time_min: number;
    strategy: string;
    description: string;
  };
}

// Тип для ответа от API при запросе маршрута
export interface RouteResponse {
  type: "FeatureCollection";
  routes: {
    main: RouteApiModel;
    alternatives?: RouteApiModel[];
  };
  metadata: {
    departure_time: string;
    user: string;
    has_alternatives: boolean;
  };
}

// Тип для данных дорожного графа, получаемых от API
export interface RouteGraphResponse {
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
