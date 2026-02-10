import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error

from app.ml.traffic_model import get_traffic_model

def test() -> None:
    print("ТЕСТИРОВАНИЕ МОДЕЛИ")
    print("-"*60)
    
    # Загрузка
    train_model = get_traffic_model()
    try:
        train_model
    except FileNotFoundError:
        print("\nОшибка: Модель не найдена!")
        return
    
    # ТЕСТ-КЕЙСЫ
    print("\n" + "-"*60)
    print("ТЕСТ-КЕЙСЫ")
    print("="*60)
    
    # Порядок признаков (расстояние, время, загруженность, максимальная скорость, категория, оди, описание)
    # Тесты охватывают разные сценарии
    tests = [
    # --- A. БАЗОВАЯ ФИЗИКА ---
    (100, 12, 0, 50, 1, 0.1, "Очень короткий участок, день, свободно"),
    (300, 12, 0, 50, 1, 0.3, "Короткий участок, день, свободно"),
    (1000, 12, 0, 50, 1, 1.2, "Средний участок, день, свободно"),
    (3000, 12, 0, 50, 1, 3.5, "Длинный участок, день, свободно"),
    (8000, 12, 0, 50, 1, 9.0, "Очень длинный участок, день, свободно"),

    # --- B. ВЛИЯНИЕ ЗАГРУЖЕННОСТИ ---
    (1000, 12, 0, 50, 1, 1.2, "Один участок, свободно"),
    (1000, 12, 1, 50, 1, 2.0, "Один участок, умеренно"),
    (1000, 12, 2, 50, 1, 4.0, "Один участок, пробка"),

    # --- C. ЧАС ПИК ---
    (2000, 8, 1, 50, 2, 4.0, "Утро, час пик, средняя дорога"),
    (2000, 14, 1, 50, 2, 3.0, "День, не пик, средняя дорога"),
    (2000, 18, 2, 50, 2, 6.5, "Вечер, час пик, пробка"),
    (2000, 23, 0, 50, 2, 2.2, "Ночь, свободно"),

    # --- D. ТИП ДОРОГИ ---
    (2000, 12, 1, 30, 1, 4.5, "Жилая улица, умеренно"),
    (2000, 12, 1, 50, 2, 3.0, "Средняя дорога, умеренно"),
    (2000, 12, 1, 90, 3, 1.8, "Магистраль, умеренно"),

    # --- E. ВЫСОКИЕ СКОРОСТИ ---
    (5000, 12, 0, 90, 3, 3.5, "Магистраль, высокая скорость"),
    (5000, 12, 2, 90, 3, 8.5, "Магистраль, пробка"),

    # --- F. НОЧЬ ---
    (3000, 2, 0, 60, 3, 2.8, "Ночь, магистраль"),
    (3000, 2, 1, 40, 2, 4.0, "Ночь, средняя дорога"),

    # --- G. КРАЙНИЕ ---
    (50, 12, 0, 20, 1, 0.1, "Экстремально короткий"),
    (15000, 17, 2, 60, 3, 25.0, "Очень длинный, вечер, пробка"),
    ]
    
    print(f"\n{'№':<3} {'Сценарий':<35} {'Ожидаемое значение':<8} {'Прогноз':<8} {'Ошибка':<8}")

    predictions = []
    expected = []
    
    for i, (length, hour, traffic, speed, cat, exp, desc) in enumerate(tests, 1):
        pred = train_model.predict(length, hour, traffic, speed, cat)
        error = abs(pred - exp)
        
        predictions.append(pred)
        expected.append(exp)
        
        print(f"{i:<3} {desc:<35} {exp:<8.2f} {pred:<8.2f} {error:<8.2f}")
    
    # Метрики
    print("\n" + "-"*60)
    print("ИТОГОВЫЕ МЕТРИКИ")
    
    mae = mean_absolute_error(expected, predictions)
    rmse = np.sqrt(mean_squared_error(expected, predictions))
    success = sum(1 for e, p in zip(expected, predictions) if abs(e-p) <= 1.0)
    success_rate = success / len(tests) * 100
    
    print(f"\nMAE:  {mae:.3f} мин")
    print(f"RMSE: {rmse:.3f} мин")
    print(f"Точность (±1 мин): {success_rate:.1f}% ({success}/{len(tests)})")
    
    # Распределение ошибок
    print("\nРаспределение ошибок:")
    errors = [abs(e - p) for e, p in zip(expected, predictions)]
    
    ranges = [
        (0, 0.5, "Отличные (<0.5)"),
        (0.5, 1.0, "Хорошие (0.5-1.0)"),
        (1.0, 2.0, "Приемлемые (1-2)"),
        (2.0, 999, "Плохие (>2)")
    ]
    
    for low, high, label in ranges:
        count = sum(1 for e in errors if low <= e < high)
        pct = count / len(errors) * 100
        print(f"  {label:<25} {count:2d} ({pct:5.1f}%)")


if __name__ == "__main__":
    test()