import { motion, AnimatePresence } from "framer-motion";
import { ChevronsLeft, X } from "lucide-react";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";

import { legendItems } from "./constants/legend.data";
import {
  legendAsideVariants,
  legendContentVariants,
} from "./constants/legend.variants";
import { IndicatorItems } from "./IndicatorItems";
import styles from "./legend.module.css";

export const Legend = (): React.ReactElement => {
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
            <h4 className={styles.title}>Легенда:</h4>

            <ul className={styles.list}>
              <IndicatorItems
                items={legendItems.filter(
                  (indicator) => indicator.variant === "dot",
                )}
              />
              <hr className={styles.hr} />
              <IndicatorItems
                items={legendItems.filter(
                  (indicator) => indicator.variant === "line",
                )}
              />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};
