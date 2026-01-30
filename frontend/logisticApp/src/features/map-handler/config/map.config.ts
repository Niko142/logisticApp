import type { Coordinates } from "@/types/models/route.types";

const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY;
if (!MAPTILER_KEY) console.warn("MAPTILER_KEY отсутствует");

export const MAP_CONFIG = {
  map: {
    center: [53.1959, 50.1008] as Coordinates,
    zoom: 12,
  },
  tileLayer: {
    attribution: `
    &copy; <a href="https://mourner.github.io/Leaflet/reference">Leaflet</a>, 
    &copy; <a href="https://www.maptiler.com">MapTiler</a>, 
    &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors
  `,
    url: `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
    tileSize: 512,
    zoomOffset: -1,
  } as const,
  polyline: {
    color: "var(--color-blue-300)",
    weight: 4,
    opacity: 0.95,
    lineCap: "round",
  } as const,
} as const;
