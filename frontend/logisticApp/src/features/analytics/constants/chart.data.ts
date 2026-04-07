import type { TrafficLevel } from "@/types/common.types";

import type { ChartData } from "../types/chart.types";

// Цвета для категорий загруженности дорог
export const TRAFFIC_COLORS: Record<TrafficLevel, string> = {
  0: "var(--color-green-400)",
  1: "var(--color-orange)",
  2: "var(--color-red-400)",
};

// Тестовые данные для графиков (опциональные тестовые данные))
export const dailyData: ChartData = [
  { label: "00:00-03:00", score: 2.0 },
  { label: "04:00-07:00", score: 4.0 },
  { label: "08:00-11:00", score: 4.5 },
  { label: "12:00-15:00", score: 4.0 },
  { label: "16:00-19:00", score: 8.0 },
  { label: "20:00-23:00", score: 3.3 },
];

export const weeklyData: ChartData = [
  { label: "Пн", score: 5.2 },
  { label: "Вт", score: 6.8 },
  { label: "Ср", score: 7.4 },
  { label: "Чт", score: 5.9 },
  { label: "Пт", score: 8.1 },
  { label: "Сб", score: 4.3 },
  { label: "Вс", score: 3.1 },
];
