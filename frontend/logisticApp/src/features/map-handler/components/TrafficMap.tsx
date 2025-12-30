import { useEffect, useState } from "react";
import {
  GeoJSON,
  Marker,
  MapContainer,
  TileLayer,
  Polyline,
} from "react-leaflet";

import { setRoute } from "@/services/api";

import { Legend } from "./Legend";
import { LocationMarker } from "./LocationMarker";
import styles from "./map.module.css";
import SearchInput from "./SearchInput";
import {
  initLeafletIcons,
  MAP_CONFIG,
  TILE_LAYER_CONFIG,
} from "../config/map.config";
import { useRoadGraph } from "../hooks/useRoadGraph";
import { useRoutePoints } from "../hooks/useRoutePoints";
import { initTrafficStyle } from "../utils/geo";

export const TrafficMap = () => {
  const { geoData } = useRoadGraph();
  const [showTraffic, setShowTraffic] = useState<boolean>(true); // Показываем загруженность дорог или нет

  const { points, routeData, addPoint, clearRoute } = useRoutePoints(setRoute);

  // Инициализация необходимых иконок
  useEffect(() => {
    initLeafletIcons();
  }, []);

  return (
    <section className={styles.map}>
      <MapContainer {...MAP_CONFIG} className={styles.container}>
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
          <Polyline
            positions={routeData.path}
            pathOptions={{ color: "blue", weight: 4 }}
          />
        )}

        {/* Маркер */}
        {points.map((point, i) => (
          <Marker key={i} position={point} />
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
