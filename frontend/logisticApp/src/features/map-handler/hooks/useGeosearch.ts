import { GeoSearchControl, type GeoSearchEvent } from "leaflet-geosearch";
import { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

import type { GeoSearchOptions } from "../types/geo.types";

/**
 * Хук для добавления гео-поиска на карту
 * @param onSelect - Функция, вызываемая при выборе локации
 * @param options - Опции для гео-поиска
 * @returns Хук для добавления гео-поиска на карту
 */
export const useGeoSearch = ({ onSelect, options }: GeoSearchOptions) => {
  const map = useMap();

  // Сохраняем опции в рефе, чтобы избежать пересоздания geosearchControl при каждом рендере
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  // Обработчик выбора локации
  const handleSelect = useCallback(
    (e: L.LeafletEvent) => {
      const geoEvent = e as unknown as GeoSearchEvent;
      if (!geoEvent.location) return;

      const { x: lng, y: lat } = geoEvent.location;
      onSelect([lat, lng]);
    },
    [onSelect]
  );

  useEffect(() => {
    const searchControl = new GeoSearchControl(optionsRef.current);
    map.addControl(searchControl);
    map.on("geosearch/showlocation", handleSelect);

    return () => {
      map.off("geosearch/showlocation", handleSelect);
      map.removeControl(searchControl);
    };
  }, [map, handleSelect]);
};
