import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import styles from "./chart.module.css";
import { ChartTooltip } from "./ChartTooltip";
import { dailyData, weeklyData } from "../constants/chart.data";
import type { FilterMode } from "../types/chart.types";

const FilterOptions: FilterMode[] = ["day", "week"];

export const LineChart = () => {
  const [currentMode, setCurrentMode] = useState<"day" | "week">("day");
  const data = currentMode === "day" ? dailyData : weeklyData;

  return (
    <div className={styles.chartContainer}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Статистика загруженности</h2>
          <p className={styles.description}>
            {currentMode === "day"
              ? "По временным интервалам"
              : "По дням недели"}
          </p>
        </div>

        {/* Фильтры */}
        <menu className={styles.toggleMenu}>
          {FilterOptions.map((option) => {
            const activeMode = currentMode === option;

            return (
              <button
                key={option}
                className={
                  activeMode ? styles.toggleButtonActive : styles.toggleButton
                }
                onClick={() => setCurrentMode(option)}
              >
                {option === "day" ? "День" : "Неделя"}
              </button>
            );
          })}
        </menu>
      </header>

      {/* График */}
      <ResponsiveContainer width="99%" height={260}>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 4, left: -16, bottom: 0 }}
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-blue-300)"
                stopOpacity={0.3}
              />
              <stop
                offset="100%"
                stopColor="var(--color-blue-300)"
                stopOpacity={0.0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="5 6"
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-gray-250)", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fill: "var(--color-gray-250", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
            dx={-4}
          />

          <Tooltip content={<ChartTooltip />} cursor={{ strokeWidth: 1 }} />

          <Area
            type="monotone"
            dataKey="score"
            stroke="var(--color-blue-300)"
            strokeWidth={2.5}
            fill="url(#areaGrad)"
            dot={{
              r: 4,
              fill: "#var(--color-black)",
              stroke: "var(--color-blue-300)",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "var(--color-blue-300)",
              stroke: "var(--color-white)",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Легенда */}
      <footer className={styles.legend}>
        <div className={styles.legendIndicator} />
        <span className={styles.legendText}>Индекс загруженности</span>
      </footer>
    </div>
  );
};
