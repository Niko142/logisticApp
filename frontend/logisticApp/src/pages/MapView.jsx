import { useEffect, useState } from "react";
import instance from "../api/axios";
import { fetchRoute } from "../api/route";
import { getColorByTraffic } from "../data/data";
import SearchInput from "../components/SearchInput";
import Header from "../components/Header";
import { handlePointSelect } from "../utils/BuildingRoute";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMapEvents,
  Marker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = () => {
  const [geoData, setGeoData] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [points, setPoints] = useState([]);
  const [showTraffic, setShowTraffic] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const res = await instance.get("/api/graph", {
          signal: abortController.signal,
        });
        setGeoData(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Возникла ошибка при загрузке данных:", err);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, []);

  // Построение маршрутов по клику левой кнопки мыши
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const newPoint = [e.latlng.lat, e.latlng.lng];
        handlePointSelect(
          newPoint,
          points,
          setPoints,
          setRouteData,
          fetchRoute
        );
      },

      // Сброс проставленных точек при нажатии правой кнопки мыши
      contextmenu() {
        setPoints([]);
        setRouteData(null);
      },
    });

    return null;
  };

  return (
    <section className="map">
      <Header />
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
              layer.setStyle({
                color: showTraffic ? getColorByTraffic(traffic) : null,
                weight: 2,
              });
            }}
          />
        )}

        {routeData && (
          <GeoJSON data={routeData} style={{ color: "blue", weight: 4 }} />
        )}
        {points.map((point, i) => (
          <Marker key={i} position={point} />
        ))}

        {/* Поле для поиска адреса, а также построения маршрутов */}
        <SearchInput
          onSelect={(newPoint) =>
            handlePointSelect(
              newPoint,
              points,
              setPoints,
              setRouteData,
              fetchRoute
            )
          }
        />
      </MapContainer>
      {/* Легенда для карты */}
      <div className="legend">
        <h4>Загруженность:</h4>
        <div className="legend__item">
          <label style={{ display: "block" }} htmlFor="traffic">
            <input
              className="legend__checkbox"
              type="checkbox"
              id="traffic"
              checked={!showTraffic}
              onChange={() => setShowTraffic((prev) => !prev)}
            />
            Выкл. загруженность
          </label>
        </div>

        <div className="legend__item">
          <span className="legend__indicator indicator--green" />
          Свободно
        </div>
        <div className="legend__item">
          <span className="legend__indicator indicator--orange" />
          Средне
        </div>
        <div className="legend__item">
          <span className="legend__indicator indicator--red" />
          Пробка
        </div>

        {/* Результаты прогноза на время поездки */}
        {routeData?.summary?.total_predicted_time_min && (
          <div className="legend__total">
            Время маршрута:{" "}
            <span className="legend__time">
              {routeData.summary.total_predicted_time_min} мин
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default MapView;
