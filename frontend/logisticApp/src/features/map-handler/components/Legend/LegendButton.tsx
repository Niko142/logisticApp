import { ChevronsLeft, X } from "lucide-react";

import { Icon } from "@/components/ui/Icon";

import styles from "./legend.module.css";
import type { LegendButtonProps } from "./legend.types";

export const LegendButton = ({
  onToggle,
  isOpen,
}: LegendButtonProps): React.ReactElement => {
  return (
    <button
      className={styles.legendButton}
      onClick={onToggle}
      aria-label="Открыть/Закрыть легенду"
    >
      <Icon
        icon={isOpen ? X : ChevronsLeft}
        variant={isOpen ? "close" : "open"}
        size="md"
      />
    </button>
  );
};
