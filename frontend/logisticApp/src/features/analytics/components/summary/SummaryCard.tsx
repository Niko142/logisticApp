import clsx from "clsx";
import { ClipLoader } from "react-spinners";

import { Icon } from "@/components/ui/Icon";
import { useAnalyticsSummary } from "@/features/analytics/hooks/useAnalyticsQuery";

import { TREND_VARIANTS } from "./card.variants";
import styles from "./summary.module.css";
import type { SummaryCardProps } from "../../types/card.types";

export const SummaryCard = ({
  cardIcon = null,
  title,
  value,
  trend,
  delta,
  unit,
}: SummaryCardProps): React.ReactElement => {
  const { isLoading } = useAnalyticsSummary();

  if (isLoading) return <ClipLoader color="var(--color-blue-500)" />;

  const { className: TrendClassName, icon: TrendIcon } = TREND_VARIANTS[trend];

  return (
    <article className={styles.cardContainer}>
      <div className={styles.cardInfo}>
        {cardIcon && (
          <div className={styles.iconWrapper}>
            <Icon icon={cardIcon.icon} size={24} variant={cardIcon.variant} />
          </div>
        )}

        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardValue}>{value}</p>
      </div>

      <div className={styles.cardContent}>
        <Icon
          icon={TrendIcon}
          className={clsx(styles.icon, TrendClassName)}
          size={30}
        />
        <span className={clsx(styles.delta, TrendClassName)}>
          {delta !== 0 ? delta.toFixed(1) : delta} {unit}
        </span>
      </div>
    </article>
  );
};
