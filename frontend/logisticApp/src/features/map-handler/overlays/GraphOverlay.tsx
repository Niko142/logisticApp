import { ClipLoader } from "react-spinners";

import styles from "./overlay.module.css";
import type { GraphOverlayProps } from "./overlay.types";

export const GraphOverlay = ({ isLoading, error }: GraphOverlayProps) => {
  return (
    <div className={styles.graphOverlay}>
      {/* При загрузке */}
      {isLoading && <ClipLoader size={45} color="var(--color-blue-600)" />}
      {/* При ошибках */}
      {error && <p className={styles.graphOverlayMessage}>{error}</p>}
    </div>
  );
};
