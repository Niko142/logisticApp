// Тип для координат
export type Coordinates = [number, number];

type RouteLine = Coordinates[];

export type RouteModel = {
  path: RouteLine;
  totalTimeMin?: number;
};
