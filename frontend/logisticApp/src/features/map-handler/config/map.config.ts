import L from "leaflet";

import type { Coordinates } from "@/types/models/route.types";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// удаляем ненужные иконки маркеров по умолчанию
export const initLeafletIcons = () => {
  delete (
    L.Icon.Default.prototype as unknown as {
      _getIconUrl: unknown;
    }
  )._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
};

export const MAP_CONFIG = {
  center: [53.1959, 50.1008] as Coordinates,
  zoom: 12,
} as const;

export const TILE_LAYER_CONFIG = {
  attribution: "OpenStreetMap",
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
} as const;
