// Тип для тела запроса о регистрации
export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

// Тип для тела запроса об авторизации
export interface LoginResponse {
  token: string;
}

// Тип для тела запроса о профиле пользователя
export interface ProfileResponse {
  success: boolean;
  message: string;
  profile: RegisterResponse;
}

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
