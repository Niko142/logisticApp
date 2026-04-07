import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./chart.module.css";

export const LineChartSkeleton = () => (
  <div className={styles.chartContainer}>
    <header className={styles.header}>
      <div>
        <Skeleton width={220} height={24} />
        <Skeleton width={160} height={16} style={{ marginTop: 8 }} />
      </div>
      <Skeleton width={140} height={38} borderRadius={"var(--radius-2)"} />
    </header>

    <Skeleton height={260} borderRadius={8} />
    <Skeleton width={160} height={16} style={{ marginTop: 16 }} />
  </div>
);

export const PieChartSkeleton = () => (
  <div className={styles.chartPieContainer}>
    <header className={styles.header}>
      <div>
        <Skeleton width={220} height={24} />
        <Skeleton width={160} height={16} style={{ marginTop: 8 }} />
      </div>
    </header>

    <Skeleton circle height={220} width={220} />

    <Skeleton width={140} height={16} style={{ marginTop: 20 }} />
    <Skeleton width={140} height={16} style={{ marginTop: 8 }} />
    <Skeleton width={140} height={16} style={{ marginTop: 8 }} />
  </div>
);
