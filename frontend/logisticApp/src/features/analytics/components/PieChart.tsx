import { Cell, Pie, PieChart as Chart, ResponsiveContainer } from "recharts";

import styles from "./chart.module.css";

const trafficData = [
  { name: "Свободно", value: 14.5, color: "var(--color-green-400)" },
  { name: "Средне", value: 69.0, color: "var(--color-orange)" },
  { name: "Пробка", value: 24.5, color: "var(--color-red-400)" },
];

export const PieChart = () => {
  return (
    <div className={styles.chartPieContainer}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Распределение загруженности</h2>
          <p className={styles.description}>Доля по категориям</p>
        </div>
      </header>

      <ResponsiveContainer width="100%" height={260}>
        <Chart>
          <Pie
            data={trafficData}
            cx="50%"
            cy="50%"
            outerRadius={120}
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
