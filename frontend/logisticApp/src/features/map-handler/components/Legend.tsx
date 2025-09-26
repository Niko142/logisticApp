import type { LegendMapProps } from "../types/map.types";

export const Legend = ({ isShow, onChange, data }: LegendMapProps) => {
  return (
    <div className="legend">
      <h4>Загруженность:</h4>

      {/* Переключатель загруженности */}
      <div className="legend__item">
        <label style={{ display: "block" }} htmlFor="traffic">
          <input
            className="legend__checkbox"
            type="checkbox"
            id="traffic"
            checked={!isShow}
            onChange={onChange}
          />
          Показывать загруженность
        </label>
      </div>

      {/* Индикаторы */}
      <div className="legend__item">
        <span className="legend__indicator indicator--green" />
        Свободно
      </div>
      <div className="legend__item">
        <span className="legend__indicator indicator--orange" />
        Средне
      </div>
      <div className="legend__item">
        <span className="legend__indicator indicator--red" />
        Пробка
      </div>

      {/* Время маршрута */}
      {data?.summary?.total_predicted_time_min && (
        <div className="legend__total">
          Время маршрута:{" "}
          <span className="legend__time">
            {data.summary.total_predicted_time_min} мин
          </span>
        </div>
      )}
    </div>
  );
};
