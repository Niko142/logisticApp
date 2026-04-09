import type { DeltaTrend } from "../types/card.types";

/**
 * Функция для определения тренда метрики на основе ее изменения
 * @param delta - Изменение метрики в процентах
 * @returns Направление тренда
 */
export function getMetricTrend(delta: number): DeltaTrend {
  if (delta > 0) return "positive";
  if (delta < 0) return "negative";
  return "neutral";
}
