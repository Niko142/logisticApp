import {
  OpenStreetMapProvider,
  type GeoSearchEvent,
  GeoSearchControl,
} from "leaflet-geosearch";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

import type { SearchInputProps } from "../types/map.types";

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

    // Обработчик выбора местоположения в поиске
    const handleLocationSelect = (event: L.LeafletEvent) => {
      // Безопасное приведение типа
      const geoEvent = event as unknown as GeoSearchEvent;

      if (geoEvent.location) {
        const { x: lng, y: lat } = geoEvent.location;
        onSelect([lat, lng]);
      }
    };

    map.on("geosearch/showlocation", handleLocationSelect);

    return () => {
      map.off("geosearch/showlocation", handleLocationSelect);

      map.removeControl(searchControl);
    };
  }, [map, onSelect]);

  return null;
};

export default SearchInput;
