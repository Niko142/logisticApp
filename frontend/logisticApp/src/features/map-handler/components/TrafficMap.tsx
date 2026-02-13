import { MapContainer, TileLayer, AttributionControl } from "react-leaflet";

import { RouteQueries } from "@/hooks/useRouteQuery";
import { useRouteStore } from "@/store/route-store";

import {
  AlternativeRouteLayer,
  MarkerLayer,
  RouteLayer,
  TrafficLayer,
} from "./layers";
import { Legend } from "./Legend";
import styles from "./map.module.css";
import SearchInput from "./SearchInput";
import { MAP_CONFIG } from "../config/map.config";
import { MapEventHandler } from "../handlers/MapEventHandler";
import { useRouteController } from "../hooks/useRouteController";
import { RouteOverlay } from "./overlays/RouteOverlay";

export const TrafficMap = () => {
  const { points } = useRouteStore();

  // Обработчик добавления точки
  const { handleAddPoint, isBuilding, isError } = useRouteController(points);

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
        {/* Обработка состояний при выполнении запроса на формирование маршрута */}
        <RouteOverlay isFetching={isBuilding} isError={isError} />
      </MapContainer>

      <Legend />
    </section>
  );
};
