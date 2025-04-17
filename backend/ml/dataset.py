import random
import pandas as pd
import osmnx as ox
from config import GRAPHML_PATH

# Генерация тестового датасета для прогнозирования загруженности
def generate_fake_traffic_dataset(num_samples=10000):
    G = ox.load_graphml(GRAPHML_PATH)
    rows = []

    for _ in range(num_samples):
        u, v, k = random.choice(list(G.edges(keys=True)))
        edge = G.get_edge_data(u, v, k)
        length = edge.get("length", 100)

        time_of_day = random.randint(0, 23)  # часы 
        traffic_level = random.choice([0, 1, 2])  # 0 — низкий, 1 —  среднее 2 — пробка

        # Имитация "времени проезда"
        base_speed = 50  # скорость, км/ч
        speed_factor = {0: 1.0, 1: 0.6, 2: 0.3}[traffic_level]
        travel_time = length / 1000 / (base_speed * speed_factor) * 60  # перевод в минуты

        rows.append({
            "length": length,
            "time_of_day": time_of_day,
            "traffic_level": traffic_level,
            "travel_time": travel_time
        })

    return pd.DataFrame(rows)
