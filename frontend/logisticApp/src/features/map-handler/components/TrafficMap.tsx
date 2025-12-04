import L from "leaflet";
import { useEffect, useState } from "react";
import {
  GeoJSON,
  Marker,
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import { getRoadGraph, setRoute } from "@/services/api";
import type { Coordinates } from "@/types/models/route.types";

import { Legend } from "./Legend";
import SearchInput from "./SearchInput";
import { useRoutePoints } from "../hooks/useRoutePoints";
import type { GeoData } from "../types/geo.types";
import { getColorByTraffic } from "../utils/traffic";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "./Map.css";

// Удаляем стили маркера по умолчанию
delete (
  L.Icon.Default.prototype as unknown as {
    _getIconUrl: unknown;
  }
)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export const TrafficMap = () => {
  const [geoData, setGeoData] = useState<GeoData | null>(null); // GeoJSON-данные
  const [showTraffic, setShowTraffic] = useState<boolean>(true); // Показываем загруженность дорог или нет

  const { points, routeData, addPoint, clearRoute } = useRoutePoints(setRoute);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRoadGraph = async () => {
      try {
        const response = await getRoadGraph({ signal: controller.signal });
        setGeoData(response);
      } catch (err) {
        console.error("Возникла ошибка при загрузке данных:", err);
      }
    };
    fetchRoadGraph();

    return () => controller.abort();
  }, []);

  // Обработка событий клика по карте
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const newPoint: Coordinates = [e.latlng.lat, e.latlng.lng];
        addPoint(newPoint);
      },
      contextmenu: clearRoute,
    });

    return null;
  };

  // TODO: вынести данные по карте в config

  return (
    <>
      <MapContainer
        center={[53.1959, 50.1008]}
        zoom={12}
        className="map__container"
      >
        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker />

        {geoData && (
          <GeoJSON
            key={showTraffic ? "traffic-on" : "traffic-off"}
            data={geoData}
            onEachFeature={(feature, layer) => {
              const traffic = feature.properties.traffic_level;

              // Типизация setStyle и его возможного изменения
              if ("setStyle" in layer) {
                const pathLayer = layer as L.Path;
                pathLayer.setStyle({
                  color: showTraffic ? getColorByTraffic(traffic) : undefined,
                  weight: 2,
                });
              }
            }}
          />
        )}

        {routeData && (
          <GeoJSON data={routeData} style={{ color: "blue", weight: 4 }} />
        )}

        {points.map((point, index) => (
          <Marker key={index} position={point} />
        ))}

        {/* Input для поиска адреса */}
        <SearchInput onSelect={addPoint} />
      </MapContainer>

      <Legend
        isShowing={!showTraffic}
        onChange={() => setShowTraffic((prev) => !prev)}
        data={routeData}
      />
    </>
  );
};
