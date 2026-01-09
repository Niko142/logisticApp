import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsLeft, X } from "lucide-react";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { formateMinuteTime } from "@/utils/time.utils";

import styles from "./map.module.css";
import { legendItems } from "../constants/legend.data";
import {
  legendAsideVariants,
  legendContentVariants,
} from "../constants/legend.variants";
import type { LegendMapProps } from "../types/map.types";

export const Legend = ({ isShowing, onChange, route }: LegendMapProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleButton = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.aside
      className={styles.legend}
      variants={legendAsideVariants}
      animate={isOpen ? "open" : "close"}
    >
      <button
        className={styles.legendButton}
        onClick={handleToggleButton}
        aria-label="Открыть/Закрыть легенду"
      >
        <Icon
          icon={isOpen ? X : ChevronsLeft}
          variant={isOpen ? "close" : "open"}
          size="md"
        />
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={legendContentVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <h4>Легенда:</h4>

            <hr className={styles.hr} />

            <ul className={styles.list}>
              {/* Переключатель загруженности */}
              <li className={styles.item}>
                <label htmlFor="traffic">
                  <input
                    type="checkbox"
                    id="traffic"
                    checked={!isShowing}
                    onChange={onChange}
                  />
                  Показывать загруженность
                </label>
              </li>

              {/* Индикаторы */}
              {legendItems.map((level) => (
                <li key={level.colorClass} className={styles.item}>
                  <span
                    className={clsx(styles.indicator, styles[level.colorClass])}
                    aria-label={level.description}
                  />
                  {level.label}
                </li>
              ))}
            </ul>

            {/* Время маршрута */}
            {route?.totalTimeMin && (
              <div>
                Время маршрута:{" "}
                <span className={styles.timeRoute}>
                  {formateMinuteTime(route.totalTimeMin)}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};
