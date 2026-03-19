import styles from "./chart.module.css";
import type { ChartTooltipProps } from "../types/chart.types";

export const ChartTooltip = ({
  active,
  payload,
  label,
}: ChartTooltipProps): React.ReactElement | null => {
  if (!active || !payload?.length) return null;

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      <p className={styles.tooltipValue}>
        Загруженность: <span>{payload[0].value.toFixed(1)}</span>
      </p>
    </div>
  );
};
