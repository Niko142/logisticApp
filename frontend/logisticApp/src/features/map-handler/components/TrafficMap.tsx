import { useState } from "react";
import { MapContainer, TileLayer, AttributionControl } from "react-leaflet";

import { RouteQueries } from "@/hooks/useRouteQuery";
import { useRouteStore } from "@/store/route-store";

import {
  AlternativeRouteLayer,
  MarkerLayer,
  RouteLayer,
  TrafficLayer,
} from "./layers";
import { Legend } from "./legend";
import styles from "./map.module.css";
import SearchInput from "./SearchInput";
import { MAP_CONFIG } from "../config/map.config";
import { MapEventHandler } from "../handlers/MapEventHandler";
import { useRouteController } from "../hooks/useRouteController";
import { ActionsPanel } from "./actions-panel/ActionsPanel";
import { RouteOverlay } from "./overlays/RouteOverlay";
import { LayerControl } from "../controls/LayerControl";

export const TrafficMap = () => {
  const { points } = useRouteStore();
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState<boolean>(false);

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

        <TrafficLayer />
        <RouteLayer />
        <AlternativeRouteLayer />
        <MarkerLayer />

        {/* Настройка поиска */}
        <SearchInput onSelect={handleAddPoint} />
        {/*  */}
        <LayerControl
          isOpen={isLayerPanelOpen}
          onToggle={() => setIsLayerPanelOpen((prev) => !prev)}
        />
        {/* Обработка состояний при выполнении запроса на формирование маршрута */}
        <RouteOverlay isFetching={isBuilding} isError={isError} />
      </MapContainer>

      <ActionsPanel
        isOpen={isLayerPanelOpen}
        onClose={() => setIsLayerPanelOpen(false)}
      />
      <Legend />
    </section>
  );
};
