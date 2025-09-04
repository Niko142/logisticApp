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

// Основные разделы в шапке проекта
export const headerChapters = [
  { title: "Главная", link: "main" },
  { title: "Прогнозирование", link: "predict" },
  { title: "Аналитика", link: "analytics" },
  { title: "Настройки", link: "settings" },
];

// данные для тестового графика
export const chartData = [
  {
    name: "00:00",
    балл: 3,
  },
  {
    name: "01:00",
    балл: 2,
  },
  {
    name: "02:00",
    балл: 2,
  },
  {
    name: "03:00",
    балл: 1,
  },
  {
    name: "04:00",
    балл: 2,
  },
  {
    name: "05:00",
    балл: 3,
  },
  {
    name: "06:00",
    балл: 5,
  },
  {
    name: "07:00",
    балл: 6,
  },
  {
    name: "08:00",
    балл: 7,
  },
  {
    name: "09:00",
    балл: 4,
  },
  {
    name: "10:00",
    балл: 4,
  },
  {
    name: "11:00",
    балл: 3,
  },
  {
    name: "12:00",
    балл: 5,
  },
  {
    name: "13:00",
    балл: 3,
  },
  {
    name: "14:00",
    балл: 3,
  },
  {
    name: "15:00",
    балл: 5,
  },
  {
    name: "16:00",
    балл: 6,
  },
  {
    name: "17:00",
    балл: 9,
  },
  {
    name: "18:00",
    балл: 10,
  },
  {
    name: "19:00",
    балл: 7,
  },
  {
    name: "20:00",
    балл: 4,
  },
  {
    name: "21:00",
    балл: 4,
  },
  {
    name: "22:00",
    балл: 3,
  },
  {
    name: "23:00",
    балл: 2,
  },
];
