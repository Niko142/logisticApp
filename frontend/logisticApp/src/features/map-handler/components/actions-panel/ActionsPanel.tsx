import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Icon } from "@/components/ui/Icon";
import { RouteQueries } from "@/hooks/useRouteQuery";
import { useRouteStore } from "@/store/route-store";
import { formateMinuteTime } from "@/utils/time.utils";

import styles from "./panel.module.css";
import type { ActionsPanelProps } from "./panel.types";
import { actionsAsideVariants } from "./panel.variants";
import { ToggleItem } from "./ToggleItem";

export const ActionsPanel = ({
  isOpen,
  onClose,
}: ActionsPanelProps): React.ReactElement => {
  const { data: routeData } = RouteQueries.useCurrentRoute();
  const {
    showTraffic,
    toggleTraffic,
    showAlternativeRoutes,
    toggleAlternativeRoutes,
  } = useRouteStore();

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          className={styles.actions}
          variants={actionsAsideVariants}
          initial="close"
          animate="open"
          exit="close"
        >
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрыть панель с действиями"
          >
            <Icon icon={X} size="md" />
          </button>

          <div>
            <h4 className={styles.title}>Управление:</h4>

            <ul className={styles.list}>
              {/* Переключатель загруженности */}
              <ToggleItem
                key={"traffic"}
                id="traffic"
                label="Показать загруженность"
                checked={showTraffic}
                onChange={toggleTraffic}
              />

              <hr className={styles.hr} />

              {/* Переключатель управления показом альтернативных маршрутов */}
              <ToggleItem
                key={"alternative_route"}
                id="alternative_route"
                label="Альтернативный маршрут"
                checked={showAlternativeRoutes}
                onChange={toggleAlternativeRoutes}
              />
            </ul>

            <hr className={styles.hr} />

            {/* Время маршрута */}
            {routeData?.totalTimeMin && (
              <div>
                Время маршрута:{" "}
                <span className={styles.timeRoute}>
                  {formateMinuteTime(routeData.totalTimeMin)}
                </span>
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
