import type { Coordinates, RouteModel } from "@/types/models/route.types";

import type { RouteResponse } from "./types/route-api.types";

export const mapRouteToModel = (response: RouteResponse): RouteModel => {
  if (!response.features || response.features.length === 0) {
    return { path: [] };
  }

  const coordinates: Coordinates[] = [];

  response.features.forEach((feature, index) => {
    if (feature.geometry.type === "LineString") {
      const coords = feature.geometry.coordinates as number[][];

      const convertedCoords: Coordinates[] = coords.map(([lng, lat]) => [
        lat,
        lng,
      ]);

      // coordinates.push(
      //   ...(index === 0 ? convertedCoords : convertedCoords.slice(1))
      // );

      if (index === 0) {
        coordinates.push(...convertedCoords);
      } else {
        coordinates.push(...convertedCoords.slice(1));
      }
    }
  });

  return {
    path: coordinates,
    totalTimeMin: response.summary?.total_predicted_time_min,
  };
};
