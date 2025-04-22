from ml.model import TrafficModel
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Загрузка модели
model = TrafficModel()
model.load()

# Тест-кейсы
test_cases = [
    (500, 8, 0, 0.29),    # утро, короткий отрезок, свободно
    (3000, 18, 2, 6.56),  # вечер, длинный отрезок, пробка
    (1200, 2, 1, 2.89),   # ночь, средняя загруженность
    (100, 12, 0, 0.12),   # день, очень короткий отрезок, свободно
    (5000, 7, 1, 10.00),  # утро, длинный отрезок, средняя загруженность
    (2500, 20, 2, 5.30),  # вечер, средний отрезок, пробка
    (1500, 14, 0, 2.40),  # день, средний отрезок, свободно
    (3500, 22, 1, 7.80),  # ночь, длинный отрезок, средняя загруженность
    (2000, 6, 2, 4.90),   # утро, длинный отрезок, пробка
    (800, 15, 0, 1.20),   # день, короткий отрезок, свободно
]

real_times = []
predicted_times = []

# Тестирование модели
for length, hour, level, real_time in test_cases:
    time = model.predict(length, hour, level)
    real_times.append(real_time)
    predicted_times.append(time)
    print(f"Длина: {length}м | Час: {hour} | Загруженность: {level} → Реальное время: {real_time} мин | Предсказанное: {time:.2f} мин")

# Вычисление метрик
mae = mean_absolute_error(real_times, predicted_times)  # Средняя абсолютная ошибка
rmse = np.sqrt(mean_squared_error(real_times, predicted_times))  # Среднеквадратичная ошибка

# Вычисление процента успещности предсказаний
successful_predictions = sum(1 for real, predicted in zip(real_times, predicted_times) if abs(real - predicted) <= 1.0)
percentage_success = (successful_predictions / len(test_cases)) * 100

print(f"\nСредняя абсолютная ошибка (MAE): {mae:.2f} мин")
print(f"Среднеквадратичная ошибка (RMSE): {rmse:.2f} мин")
print(f"Процент успешных предсказаний (ошибка <= 1 мин): {percentage_success:.2f}%")
