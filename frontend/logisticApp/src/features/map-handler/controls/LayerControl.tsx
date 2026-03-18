import { motion } from "framer-motion";
import L from "leaflet";
import { Settings } from "lucide-react";
import { useEffect, useState, type ReactPortal } from "react";
import { createPortal } from "react-dom";
import { useMap } from "react-leaflet";

import styles from "../map.module.css";
import type { LayerControlProps } from "../types/map.types";

/**
 * Контроллер управления слоями карты
 * @param isOpen - Текущее состояние панели (открыто/закрыто)
 * @param onToggle - Функция для переключения состояния панели
 * @param position - Позиция расположения кнопки относительно контейнера
 * @returns ReactPortal с кнопкой или null
 */
export const LayerControl = ({
  isOpen,
  onToggle,
  position = "topleft",
}: LayerControlProps): ReactPortal | null => {
  const map = useMap();

  const [controlContainer, setControlContainer] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    const CustomControl = L.Control.extend({
      options: { position },

      onAdd() {
        const container = L.DomUtil.create("a", "leaflet-control-actions");
        container.title = "Actions";
        container.ariaLabel = "Actions";
        container.ariaDisabled = "false";

        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);

        return container;
      },
    });

    const control = new CustomControl();
    control.addTo(map);

    const containerElement = control.getContainer()!;
    setControlContainer(containerElement);

    return () => {
      control.remove();
    };
  }, [map, position]);

  if (!controlContainer) return null;

  return createPortal(
    <motion.button
      aria-hidden="true"
      className={styles.button}
      animate={{
        color: isOpen ? "var(--color-blue-300)" : "var(--color-gray-200)",
      }}
      transition={{ duration: 0.2 }}
      onClick={onToggle}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Settings />
      </motion.div>
    </motion.button>,
    controlContainer,
  );
};
