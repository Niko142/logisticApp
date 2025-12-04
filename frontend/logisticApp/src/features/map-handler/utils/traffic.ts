// Получаем цвет для закрашивания ребер графа
// в зависимости от коэффициента загруженности дорог
export const getColorByTraffic = (level: number): string => {
  switch (level) {
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
