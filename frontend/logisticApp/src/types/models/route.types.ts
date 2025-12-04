// Тип для координат
export type Coordinates = [number, number];

export type RouteLine = number[][];

export type RouteModel = {
  path: RouteLine;
  totalTimeMin?: number;
};
