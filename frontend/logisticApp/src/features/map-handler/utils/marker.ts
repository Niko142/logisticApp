import L from "leaflet";

/**
 * Создание иконки маркера с заданным цветом
 * @param color - Цвет иконки маркера
 * @returns Иконка маркера
 */
export const createMarkerIcon = (color = "var(--color-blue-500)") =>
  L.divIcon({
    className: "",
    html: `
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.5 0C5.6 0 0 5.6 0 12.5C0 22.2 12.5 41 12.5 41C12.5 41 25 22.2 25 12.5C25 5.6 19.4 0 12.5 0Z"
          fill="${color}"
        />
        <circle cx="12.5" cy="12.5" r="5" fill="var(--color-white)"/>
      </svg>
    `,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
  });
