// Тип для координат
export type Coordinates = [number, number];

// Типы для ответа API маршрута
interface RouteSummary {
  total_predicted_time_min: number;
  [key: string]: unknown;
}

// Тип для тела запроса по построению маршрута
export interface RouteResponse {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: Record<string, unknown>;
    geometry: {
      type: string;
      coordinates: number[][][] | number[][];
    };
  }>;
  summary?: RouteSummary;
}

// Формат данных в блоке регистрации
export type RegisterInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Формат данных в блоке авторизации
export type LoginInputs = {
  username: string;
  password: string;
};
