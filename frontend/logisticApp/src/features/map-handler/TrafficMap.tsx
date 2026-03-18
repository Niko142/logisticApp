import { useState } from "react";
import { MapContainer, TileLayer, AttributionControl } from "react-leaflet";

import { RouteQueries } from "@/hooks/useRouteQuery";
import { useRouteStore } from "@/store/route-store";

import { ActionsPanel } from "./components/actions-panel";
import { Legend } from "./components/legend";
import { MAP_CONFIG } from "./config/map.config";
import { LayerControl, SearchInput } from "./controls";
import { MapEventHandler } from "./handlers/MapEventHandler";
import { useRouteController } from "./hooks/useRouteController";
import {
  AlternativeRouteLayer,
  MarkerLayer,
  RouteLayer,
  TrafficLayer,
} from "./layers";
import styles from "./map.module.css";
import { RouteOverlay } from "./overlays/RouteOverlay";

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

        {/* Базовый слой OSM */}
        <TileLayer {...MAP_CONFIG.tileLayer} />

        {/* Обработка событий клика по карте */}
        <MapEventHandler
          onAddPoint={handleAddPoint}
          onClear={handleClearRoute}
        />

        <TrafficLayer />
        <RouteLayer />
        <AlternativeRouteLayer />
        <MarkerLayer />

        {/* Контроллер для custom-настройки поля ввода */}
        <SearchInput onSelect={handleAddPoint} />
        {/* Custom-кнопка для управления показываемыми слоями */}
        <LayerControl
          isOpen={isLayerPanelOpen}
          onToggle={() => setIsLayerPanelOpen((prev) => !prev)}
        />
        {/* Обработка состояний при выполнении запроса на формирование маршрута */}
        <RouteOverlay isFetching={isBuilding} isError={isError} />
      </MapContainer>

      {/* Панель для управления логикой показа данных/слоев */}
      <ActionsPanel
        isOpen={isLayerPanelOpen}
        onClose={() => setIsLayerPanelOpen(false)}
      />
      <Legend />
    </section>
  );
};
