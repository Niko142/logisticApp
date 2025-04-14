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

const MapView = () => {
  const [geoData, setGeoData] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const res = await instance.get("/graph", {
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
    <MapContainer
      center={[53.1959, 50.1008]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker />

      {geoData && <GeoJSON data={geoData} style={{ color: "blue" }} />}
      {routeData && (
        <GeoJSON data={routeData} style={{ color: "red", weight: 5 }} />
      )}
      {points.map((point, i) => (
        <Marker key={i} position={point} />
      ))}
    </MapContainer>
  );
};

export default MapView;
