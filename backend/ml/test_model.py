from ml.model import TrafficModel

# Загрузка модели
model = TrafficModel()
model.load()

# Тест-кейсы для проверки рабоспособности модели
test_cases = [
    (500, 8, 0),    # утро, короткий отрезок, свободно
    (3000, 18, 2),  # вечер, длинный отрезок, пробка
    (1200, 2, 1),   # ночь, средняя загруженность
]

for length, hour, level in test_cases:
    time = model.predict(length, hour, level)
    print(f"Длина: {length}м | Час: {hour} | Загруженность: {level} → {time:.2f} мин")

