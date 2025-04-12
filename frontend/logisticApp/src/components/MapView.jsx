import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import instance from "../api/axios";

const MapView = () => {
  const [geoData, setGeoData] = useState(null);

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
      {geoData && <GeoJSON data={geoData} style={{ color: "blue", }} />}
    </MapContainer>
  );
};

export default MapView;
