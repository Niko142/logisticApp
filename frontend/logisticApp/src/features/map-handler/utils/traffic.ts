/**
 * Функция для закрашивания участка дорог в зависимости от индекса загруженности
 * @param lvl - Индекс дорожной загруженности (от 0 до 2)
 * @returns Цвет, который описывает текущую загруженность отдельно взятого участка
 */
export const getColorByTraffic = (lvl: number): string => {
  switch (lvl) {
    case 0:
      return "green";
    case 1:
      return "orange";
    case 2:
      return "red";
    default:
      return "gray";
  }
};
