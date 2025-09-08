import {
  GeoSearchControl,
  OpenStreetMapProvider,
  type GeoSearchEvent,
} from "leaflet-geosearch";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { SearchInputProps } from "../types/geo-type";

// FIXME: Подумать насчет handler
const SearchInput = ({ onSelect }: SearchInputProps) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    const handler = (result: GeoSearchEvent) => {
      const { x: lng, y: lat } = result.location;
      onSelect([lat, lng]);
    };
    map.on(
      "geosearch/showlocation",
      handler as unknown as L.LeafletEventHandlerFn
    );

    // map.on("geosearch/showlocation", handler);

    return () => {
      map.off(
        "geosearch/showlocation",
        handler as unknown as L.LeafletEventHandlerFn
      );

      // map.off("geosearch/showlocation", handler);
      map.removeControl(searchControl);
    };
  }, [map, onSelect]);

  return null;
};

export default SearchInput;
