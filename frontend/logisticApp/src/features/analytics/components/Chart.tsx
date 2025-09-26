import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { hourlyScoreData } from "../constants/analytics.data";

export const Chart = () => {
  return (
    <article className="analytics__chart">
      <h2>Анализ загруженности</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={hourlyScoreData}
          margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
        >
          <Line type="monotone" dataKey="mark" stroke="#8884d8" />
          <XAxis dataKey="name">
            <Label
              value="Время (в часах)"
              offset={-10}
              position="insideBottom"
            />
          </XAxis>
          <YAxis>
            <Label value="Уровень загруженности" angle={-90} />
          </YAxis>
          <CartesianGrid strokeDasharray="6" stroke="#ccc" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </article>
  );
};
