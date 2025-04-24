import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";

const SearchInput = ({ onSelect }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    const handler = (result) => {
      const { x: lng, y: lat } = result.location;
      onSelect([lat, lng]);
    };

    map.on("geosearch/showlocation", handler);

    return () => {
      map.off("geosearch/showlocation", handler);
      map.removeControl(searchControl);
    };
  }, [map, onSelect]);

  return null;
};

export default SearchInput;
