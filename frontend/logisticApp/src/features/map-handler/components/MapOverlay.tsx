import { ClipLoader } from "react-spinners";

import styles from "./map.module.css";
import type { MapOverlayProps } from "../types/map.types";

export const MapOverlay = ({ type, message }: MapOverlayProps) => {
  return (
    <div className={styles.overlay}>
      {/* При загрузке */}
      {type === "pending" && (
        <ClipLoader size={45} color="var(--color-blue-600)" />
      )}
      {/* При ошибках */}
      {type === "error" && <p className={styles.overlayMessage}>{message}</p>}
    </div>
  );
};
