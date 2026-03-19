import type { LayoutProps } from "@/types/common.types";

import styles from "./layout.module.css";

type AnalyticsLayoutProps = LayoutProps;

export const AnalyticsLayout = ({
  children,
}: AnalyticsLayoutProps): React.ReactElement => {
  return <section className={styles.analyticsContainer}>{children}</section>;
};
