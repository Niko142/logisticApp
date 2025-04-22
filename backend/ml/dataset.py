import random
import pandas as pd
import numpy as np
import osmnx as ox
from config import GRAPHML_PATH

# Генерация тестового датасета для прогнозирования загруженности
def generate_fake_traffic_dataset(num_samples=10000):
    G = ox.load_graphml(GRAPHML_PATH)
    rows = []

    # Характеристика "час-пика" на дороге
    def is_peak(hour):
        return 1 if hour in [7, 8, 9, 17, 18, 19] else 0

    # Функция, позволяющая уровень загруженности сделать зависимым от времени
    def get_traffic_level(hour):
        if hour in [7, 8, 9, 17, 18, 19]:
            return random.choices([1, 2], weights=[0.4, 0.6])[0]
        else:
            return random.choices([0, 1], weights=[0.7, 0.3])[0]

    for _ in range(num_samples):
        u, v, k = random.choice(list(G.edges(keys=True)))
        edge = G.get_edge_data(u, v, k)
        length = edge.get("length", 100)

        time_of_day = random.randint(0, 23)  # часы 
        traffic_level = get_traffic_level(time_of_day) # уровень загруженности
        peak = is_peak(time_of_day) # час-пик

        # Имитация "времени проезда"
        base_speed = 50  # скорость, км/ч
        speed_factor = {0: 1.0, 1: 0.6, 2: 0.3}[traffic_level]
        true_time = length / 1000 / (base_speed * speed_factor) * 60  # перевод в минуты

        # Добавление случайного шума в ±20%
        noise = np.random.normal(0, true_time * 0.1)
        travel_time = max(0.1, true_time + noise)

        rows.append({
            "length": length,
            "time_of_day": time_of_day,
            "traffic_level": traffic_level,
            "is_peak_hour": peak,
            "travel_time": travel_time
        })

    return pd.DataFrame(rows)
