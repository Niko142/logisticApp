import { useEffect, useState } from "react";
import instance from "@/api/axios";
import { fetchRoute } from "@/api/route";
import type { GeoData } from "../types/geo-type";
import type { Coordinates } from "@/types/type";
import { useRoutePoints } from "../hooks/useRoutePoints";
import { getColorByTraffic } from "../utils/trafficUtils";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMapEvents,
  Marker,
} from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./Map.css";

import SearchInput from "./SearchInput";
import LegendMap from "./LegendMap";

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

export const MapView = () => {
  const [geoData, setGeoData] = useState<GeoData | null>(null); // GeoJSON-данные
  const [showTraffic, setShowTraffic] = useState<boolean>(true); // Показываем загруженность дорог или нет

  const { points, routeData, addPoint, clearRoute } =
    useRoutePoints(fetchRoute);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const res = await instance.get("/api/graph", {
          signal: abortController.signal,
        });
        setGeoData(res.data);
      } catch (err) {
        if (err instanceof Error && err.name !== "CanceledError") {
          console.error("Возникла ошибка при загрузке данных:", err);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
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

        {points.map((point, i) => (
          <Marker key={i} position={point} />
        ))}

        {/* Input для поиска адреса */}
        <SearchInput onSelect={addPoint} />
      </MapContainer>

      <LegendMap
        isShow={!showTraffic}
        onChange={() => setShowTraffic((prev) => !prev)}
        data={routeData}
      />
    </>
  );
};
