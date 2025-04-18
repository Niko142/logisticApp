// Индикаторы загруженности
export const getColorByTraffic = (level) => {
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
