import type { LegendItem } from "../legend.types";

export const legendItems: LegendItem[] = [
  {
    id: 1,
    label: "Свободно",
    colorClass: "indicator--green",
    description: "Уровень загруженности: свободно",
  },
  {
    id: 2,
    label: "Средне",
    colorClass: "indicator--orange",
    description: "Уровень загруженности: средний",
  },
  {
    id: 3,
    label: "Пробка",
    colorClass: "indicator--red",
    description: "Уровень загруженности: пробка",
  },
];
