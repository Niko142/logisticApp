import type { LegendItem } from "../legend.types";

export const legendItems: LegendItem[] = [
  // === Индикаторы загруженности ===
  {
    id: 1,
    label: "Свободно",
    colorClass: "indicator--green",
    description: "Уровень загруженности: свободно",
    variant: "dot",
  },
  {
    id: 2,
    label: "Средне",
    colorClass: "indicator--orange",
    description: "Уровень загруженности: средний",
    variant: "dot",
  },
  {
    id: 3,
    label: "Пробка",
    colorClass: "indicator--red",
    description: "Уровень загруженности: пробка",
    variant: "dot",
  },
  // === Маршруты ===
  {
    id: 4,
    label: "Основной маршрут",
    colorClass: "indicator--blue",
    description: "Индикатор основного маршрута",
    variant: "line",
  },
  {
    id: 5,
    label: "Альтернативный маршрут",
    colorClass: "indicator--gray",
    description: "Индикатор альтернативного маршрута",
    variant: "line",
    dashed: true,
  },
];
