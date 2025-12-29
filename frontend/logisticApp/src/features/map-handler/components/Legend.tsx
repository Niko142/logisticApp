import { ChevronsLeft, X } from "lucide-react";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";

import type { LegendMapProps } from "../types/map.types";

export const Legend = ({ isShowing, onChange, route }: LegendMapProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Обработчик клика по кнопке
  const handleToggleButton = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <aside className="legend">
      {/* Кнопка для показа/скрытия легенды */}
      <button
        className="legend__button"
        onClick={() => handleToggleButton()}
        aria-label="Открыть/Закрыть легенду"
      >
        <Icon
          icon={isOpen ? X : ChevronsLeft}
          variant={isOpen ? "close" : "open"}
          size="md"
        />
      </button>

      {isOpen && (
        <>
          <h4>Степень загруженности:</h4>
          <ul className="legend__list">
            {/* Переключатель загруженности */}
            <li className="legend__item">
              <label htmlFor="traffic">
                <input
                  type="checkbox"
                  // id="traffic"
                  checked={!isShowing}
                  onChange={onChange}
                />
                Показывать загруженность
              </label>
            </li>
            {/* Индикаторы */}
            <li className="legend__item">
              <span
                className="legend__indicator indicator--green"
                aria-label="Зеленый индикатор, уровень загруженности: свободно"
              />
              Свободно
            </li>
            <li className="legend__item">
              <span
                className="legend__indicator indicator--orange"
                aria-label="Оранжевый индикатор, уровень загруженности - средний"
              />
              Средне
            </li>
            <li className="legend__item">
              <span
                className="legend__indicator indicator--red"
                aria-label="Красный индикатор, уровень загруженности - пробка"
              />
              Пробка
            </li>
          </ul>

          {/* Время маршрута */}
          {route?.totalTimeMin && (
            <div className="legend__total">
              Время маршрута:{" "}
              <span className="legend__time">
                {route.totalTimeMin}
                мин
              </span>
            </div>
          )}
        </>
      )}
    </aside>
  );
};
