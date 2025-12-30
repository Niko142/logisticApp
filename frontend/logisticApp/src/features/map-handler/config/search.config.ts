import { OpenStreetMapProvider } from "leaflet-geosearch";

export const SEARCH_CONTROL_CONFIG = {
  provider: new OpenStreetMapProvider(),
  style: "bar",
  showMarker: false,
  showPopup: false,
  autoClose: true,
  retainZoomLevel: false,
  searchLabel: "Введите адрес",
  animateZoom: true,
  keepResult: true,
} as const;
