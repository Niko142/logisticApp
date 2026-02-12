import { MapContainer, TileLayer, AttributionControl } from "react-leaflet";

import { RouteQueries } from "@/hooks/useRouteQuery";
import { useRouteStore } from "@/store/route-store";

import styles from "./map.module.css";
import SearchInput from "./SearchInput";
import { MAP_CONFIG } from "../config/map.config";
import { MapEventHandler } from "../handlers/MapEventHandler";
import { AlternativeRouteLayer } from "./layers/AlternativeRouteLayer";
import { MarkerLayer } from "./layers/MarkerLayer";
import { RouteLayer } from "./layers/RouteLayer";
import { TrafficLayer } from "./layers/TrafficLayer";
import { Legend } from "./Legend";
import { useRouteController } from "../hooks/useRouteController";

export const TrafficMap = () => {
  const { points } = useRouteStore();

  // Обработчик добавления точки
  const { handleAddPoint } = useRouteController(points);

  // Обработчик для очистки маршрута на карте (правый клик мыши)
  const handleClearRoute = RouteQueries.useClearRoute();

  return (
    <section className={styles.map}>
      <MapContainer
        {...MAP_CONFIG.map}
        className={styles.container}
        attributionControl={false}
      >
        <AttributionControl position="bottomright" prefix={false} />

        {/* Базовый слой OpenStreetMap */}
        <TileLayer {...MAP_CONFIG.tileLayer} />

        {/* Обработка событий клика по карте (добавление и очистка) */}
        <MapEventHandler
          onAddPoint={handleAddPoint}
          onClear={handleClearRoute}
        />

        {/* Слой дорожного графа, отображающий загруженность дорог */}
        <TrafficLayer />
        {/* Слой для сформированного основного маршрута */}
        <RouteLayer />
        {/* Слой для альтернативных маршрутов */}
        <AlternativeRouteLayer />
        {/* Слой маркеров точек (стартовая и конечная точка) */}
        <MarkerLayer />

        {/* Поле поиска */}
        <SearchInput onSelect={handleAddPoint} />
      </MapContainer>

      <Legend />
    </section>
  );
};
