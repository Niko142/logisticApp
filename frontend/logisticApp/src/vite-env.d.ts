/// <reference types="vite/client" />

declare module "leaflet-geosearch" {
  import { Control } from "leaflet";

  export class OpenStreetMapProvider {
    constructor();
  }

  export interface GeoSearchControlOptions {
    provider: OpenStreetMapProvider;
    style: "bar" | "button";
    showMarker: boolean;
    showPopup: boolean;
    autoClose: boolean;
    retainZoomLevel: boolean;
    animateZoom: boolean;
    keepResult: boolean;
  }

  export class GeoSearchControl extends Control {
    constructor(options: GeoSearchControlOptions);
  }

  export interface GeoSearchEvent {
    location: {
      x: number;
      y: number;
    };
  }
}
