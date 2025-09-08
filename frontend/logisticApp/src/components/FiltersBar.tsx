const timePeriod = ["Час", "День", "Неделя", "Месяц"] as const;
const dayTime = ["Утро", "День", "Вечер", "Ночь"] as const;

const FiltersBar = () => {
  return (
    <div className="analytics__filter">
      <article className="analytics__filter--group">
        <h3>Период</h3>
        <div className="radio">
          {timePeriod.map((option) => (
            <label key={option} className="radio__label">
              <input
                type="radio"
                name="timePeriod"
                value={option.toLowerCase()}
                className="radio__input"
              />
              <span className="radio__custom--item"></span>
              {option}
            </label>
          ))}
        </div>
      </article>

      <article className="analytics__filter--group">
        <h3>Время суток</h3>
        <div className="radio">
          {dayTime.map((option) => (
            <label key={option} className="radio__label">
              <input
                type="radio"
                name="dayTime"
                value={option.toLowerCase()}
                className="radio__input"
              />
              <span className="radio__custom--item"></span>
              {option}
            </label>
          ))}
        </div>
      </article>
    </div>
  );
};

export default FiltersBar;
