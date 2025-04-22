import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMapEvents,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import instance from "../api/axios";
import { fetchRoute } from "../api/route";
import { getColorByTraffic } from "../data/data";

const MapView = () => {
  const [geoData, setGeoData] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const res = await instance.get("/api/graph", {
          signal: abortController.signal,
        });
        setGeoData(res.data);
      } catch (err) {
        console.error("Возникла ошибка при загрузке данных:", err);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const newPoint = [e.latlng.lat, e.latlng.lng];
        if (points.length === 2) {
          setPoints([newPoint]);
          setRouteData(null);
        } else {
          const updatedPoints = [...points, newPoint];
          setPoints(updatedPoints);

          if (updatedPoints.length === 2) {
            fetchRoute(updatedPoints[0], updatedPoints[1])
              .then((data) => setRouteData(data))
              .catch((err) => console.error("Ошибка маршрута:", err));
          }
        }
      },
      // Сбросить проставленные точки или маршрут
      contextmenu() {
        setPoints([]);
        setRouteData(null);
      },
    });
    return null;
  };

  return (
    <section className="map">
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
            data={geoData}
            onEachFeature={(feature, layer) => {
              const traffic = feature.properties.traffic_level;
              layer.setStyle({
                color: getColorByTraffic(traffic),
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
      </MapContainer>

      {/* Легенда для карты */}
      <div className="legend">
        <h4 className="legend__title">Загруженность:</h4>
        <article>
          <span className="legend__indicator indicator-green" />
          Свободно
        </article>
        <article>
          <span className="legend__indicator indicator-orange" />
          Средне
        </article>
        <article>
          <span className="legend__indicator indicator-red" />
          Пробка
        </article>
        {/* Результаты прогноза на время поездки */}
        {routeData?.summary?.total_predicted_time_min && (
          <div className="legend__total-route">
            Время маршрута:{" "}
            <p>{routeData.summary.total_predicted_time_min} мин</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MapView;
