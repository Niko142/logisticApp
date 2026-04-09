import { Minus, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

import styles from "./summary.module.css";
import type { DeltaTrend } from "../../types/card.types";

export const TREND_VARIANTS: Record<
  DeltaTrend,
  {
    icon: LucideIcon;
    className: string;
  }
> = {
  positive: {
    icon: TrendingUp,
    className: styles.positive,
  },
  negative: {
    icon: TrendingDown,
    className: styles.negative,
  },
  neutral: {
    icon: Minus,
    className: styles.neutral,
  },
};
