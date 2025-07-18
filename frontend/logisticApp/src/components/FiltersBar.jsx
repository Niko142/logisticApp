const FiltersBar = () => {
  const timePeriod = ["Час", "День", "Неделя", "Месяц"];
  const dayTime = ["Утро", "День", "Вечер", "Ночь"];

  return (
    <article className="analytics__filter">
      <div className="analytics__filter-group">
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
              <span className="radio__custom-item"></span>
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="analytics__filter-group">
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
              <span className="radio__custom-item"></span>
              {option}
            </label>
          ))}
        </div>
      </div>
    </article>
  );
};

export default FiltersBar;
