import { useMapEvents } from "react-leaflet";

import type { Coordinates } from "@/types/models/route.types";

import type { MapEventHandlerProps } from "../types/map.types";

/**
 *
 *
 * @returns
 */
export const MapEventHandler = ({
  onAddPoint,
  onClear,
}: MapEventHandlerProps) => {
  useMapEvents({
    click(e) {
      const newPoint: Coordinates = [e.latlng.lat, e.latlng.lng];
      onAddPoint(newPoint);
    },
    contextmenu: onClear,
  });

  return null;
};
