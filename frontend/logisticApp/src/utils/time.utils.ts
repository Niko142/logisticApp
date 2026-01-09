/**
 * Функция для конвертации времени из минут в формат ЧЧ:ММ
 * @param minutes  - Время в минутах (округленное)
 * @returns Конвертированное время в формате ЧЧ:ММ
 */
export function formateMinuteTime(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return "0 мин";

  if (minutes < 60) return `${String(minutes)} мин`;

  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  const remainMinutes = String(Math.floor(minutes % 60)).padStart(2, "0");

  return `${hours} ч : ${remainMinutes} мин`;
}
