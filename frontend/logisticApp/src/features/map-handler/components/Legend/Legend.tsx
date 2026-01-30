import { motion, AnimatePresence } from "framer-motion";
import { ChevronsLeft, X } from "lucide-react";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { RouteQueries } from "@/hooks/useRouteQuery";
import { useRouteStore } from "@/store/route-store";
import { formateMinuteTime } from "@/utils/time.utils";

import { legendItems } from "./constants/legend.data";
import {
  legendAsideVariants,
  legendContentVariants,
} from "./constants/legend.variants";
import { IndicatorItems } from "./IndicatorItems";
import styles from "./legend.module.css";
import { ToggleItem } from "./ToggleItem";

export const Legend = (): React.ReactElement => {
  const { showTraffic, toggleTraffic } = useRouteStore();
  const { data: routeData } = RouteQueries.useCurrentRoute();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Обработчик кнопки открытия/закрытия блока
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
              <ToggleItem
                key={"traffic"}
                id="traffic"
                label="Показывать загруженность"
                checked={showTraffic}
                onChange={toggleTraffic}
              />

              {/* Индикаторы */}
              <IndicatorItems items={legendItems} />
            </ul>

            {/* Время маршрута */}
            {routeData?.totalTimeMin && (
              <div>
                Время маршрута:{" "}
                <span className={styles.timeRoute}>
                  {formateMinuteTime(routeData.totalTimeMin)}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};
