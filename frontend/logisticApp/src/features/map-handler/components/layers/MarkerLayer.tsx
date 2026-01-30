import { Marker } from "react-leaflet";

import { useRoutePoints } from "@/store/route-store";

import { createMarkerIcon } from "../../utils/marker";

export const MarkerLayer = () => {
  const points = useRoutePoints();

  return (
    <>
      {points.map((point, i) => (
        <Marker
          key={"point: " + i}
          position={point}
          icon={createMarkerIcon(i === 0 ? undefined : "var(--color-red-300)")}
        />
      ))}
    </>
  );
};
