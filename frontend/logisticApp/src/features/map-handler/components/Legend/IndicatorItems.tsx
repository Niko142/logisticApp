import clsx from "clsx";

import styles from "./legend.module.css";
import type { IndicatorItemProps } from "./legend.types";

export const IndicatorItems = ({ items }: IndicatorItemProps) =>
  items.map((indicator) => (
    <li className={styles.item} key={indicator.id}>
      <span
        className={clsx(styles.indicator, styles[indicator.colorClass])}
        aria-label={indicator.description}
      />
      {indicator.label}
    </li>
  ));
