export interface ChartProps {
  name: string;
  mark: number;
}

// Пока что тест + убрал слишком большую избыточность
export const hourlyScoreData: ChartProps[] = [
  { name: "00:00-03:00", mark: 2.0 },
  { name: "04:00-07:00", mark: 4.0 },
  { name: "08:00-11:00", mark: 4.5 },
  { name: "12:00-15:00", mark: 4.0 },
  { name: "16:00-19:00", mark: 8.0 },
  { name: "20:00-23:00", mark: 3.3 },
];
