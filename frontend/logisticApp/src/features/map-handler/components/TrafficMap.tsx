import { useState } from "react";
import {
  GeoJSON,
  Marker,
  MapContainer,
  TileLayer,
  Polyline,
  AttributionControl,
} from "react-leaflet";

import { setRoute } from "@/services/api";

import { Legend } from "./Legend";
import { LocationMarker } from "./LocationMarker";
import styles from "./map.module.css";
import SearchInput from "./SearchInput";
import {
  MAP_CONFIG,
  TILE_LAYER_CONFIG,
  POLYLINE_CONFIG,
} from "../config/map.config";
import { useRoadGraph } from "../hooks/useRoadGraph";
import { useRoutePoints } from "../hooks/useRoutePoints";
import { initTrafficStyle } from "../utils/geo";
import { createMarkerIcon } from "../utils/marker";

export const TrafficMap = () => {
  const { geoData } = useRoadGraph();
  const [showTraffic, setShowTraffic] = useState<boolean>(true); // Показываем загруженность дорог или нет

  const { points, routeData, addPoint, clearRoute } = useRoutePoints(setRoute);

  return (
    <section className={styles.map}>
      <MapContainer
        {...MAP_CONFIG}
        className={styles.container}
        attributionControl={false}
      >
        <AttributionControl position="bottomright" prefix={false} />

        <TileLayer {...TILE_LAYER_CONFIG} />

        {/* Обработка событий клика по карте */}
        <LocationMarker onAddPoint={addPoint} onClear={clearRoute} />

        {geoData && (
          <GeoJSON
            key={showTraffic ? "traffic-on" : "traffic-off"}
            data={geoData}
            onEachFeature={initTrafficStyle(showTraffic)}
          />
        )}

        {/* Сформированный маршрут */}
        {routeData && (
          <Polyline positions={routeData.path} pathOptions={POLYLINE_CONFIG} />
        )}

        {/* Маркер */}
        {points.map((point, i) => (
          <Marker
            key={i}
            position={point}
            icon={
              i === 0
                ? createMarkerIcon()
                : createMarkerIcon("var(--color-red-300)")
            }
          />
        ))}

        {/* Поле поиска */}
        <SearchInput onSelect={addPoint} />
      </MapContainer>

      <Legend
        isShowing={!showTraffic}
        onChange={() => setShowTraffic((prev) => !prev)}
        route={routeData}
      />
    </section>
  );
};
