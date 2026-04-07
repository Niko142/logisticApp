import { Cell, Pie, PieChart as Chart, ResponsiveContainer } from "recharts";

import styles from "./chart.module.css";
import { PieChartSkeleton } from "./ChartSkeleton";
import { TRAFFIC_COLORS } from "../constants/chart.data";
import { useTrafficDistribution } from "../hooks/useAnalyticsQuery";

export const PieChart = () => {
  const { data, isLoading } = useTrafficDistribution();

  if (isLoading) return <PieChartSkeleton />;

  // Преобразуем данные, добавляя цвет для каждой категории
  const trafficData =
    data?.map((item) => ({
      ...item,
      color: TRAFFIC_COLORS[item.level],
    })) ?? [];

  return (
    <div className={styles.chartPieContainer}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Распределение загруженности</h2>
          <p className={styles.description}>Доля по категориям</p>
        </div>
      </header>

      <ResponsiveContainer width="99%" height={260}>
        <Chart>
          <Pie
            data={trafficData}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            label={({ value }) => `${value}%`}
            strokeWidth={1}
          >
            {trafficData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} opacity={0.9} />
            ))}
          </Pie>
        </Chart>
      </ResponsiveContainer>

      {/* Легенда */}
      <footer className={styles.legendPie}>
        {trafficData.map((entry) => (
          <div key={entry.name} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ backgroundColor: entry.color }}
            />
            <span className={styles.legendText}>{entry.name}</span>
          </div>
        ))}
      </footer>
    </div>
  );
};
