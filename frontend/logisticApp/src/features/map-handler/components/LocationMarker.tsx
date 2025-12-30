import { useMapEvents } from "react-leaflet";

import type { Coordinates } from "@/types/models/route.types";

import type { LocationMarkerProps } from "../types/map.types";

export const LocationMarker = ({
  onAddPoint,
  onClear,
}: LocationMarkerProps) => {
  useMapEvents({
    click(e) {
      const newPoint: Coordinates = [e.latlng.lat, e.latlng.lng];
      onAddPoint(newPoint);
    },
    contextmenu: onClear,
  });

  return null;
};
