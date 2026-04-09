import { OctagonAlert, Timer } from "lucide-react";

import type { SummaryCardProps, SummaryData } from "../types/card.types";
import { getMetricTrend } from "../utils/trend.utils";

export const analyticsMetrics = (data: SummaryData): SummaryCardProps[] => [
  {
    cardIcon: {
      icon: Timer,
      variant: "card_1",
    },
    title: "Среднее время в пути",
    value: `${data.avg_travel_time} мин`,
    delta: data.delta_travel_time,
    trend: getMetricTrend(data.delta_travel_time),
    unit: "мин",
  },
  {
    cardIcon: {
      icon: OctagonAlert,
      variant: "card_2",
    },
    title: "Средняя загруженность",
    value: `${data.avg_load_percent}%`,
    delta: data.delta_load_percent,
    trend: getMetricTrend(data.delta_load_percent),
    unit: "%",
  },
];
