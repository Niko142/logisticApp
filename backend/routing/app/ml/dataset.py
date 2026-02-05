import numpy as np
import osmnx as ox
import pandas as pd
import random
from app.config import GRAPHML_PATH
from app.utils.graph_utils import categorize_road, get_default_speed, get_default_lanes
from app.utils.time_utils import is_peak_hour
from app.utils.traffic_utils import generate_traffic_level

class DatasetGenerator:
    """Генератор датасета"""
    
    def __init__(self, graphml_path=GRAPHML_PATH):
        """Инициализация: осуществление загрузки и подготовки графа"""
        self.G = ox.load_graphml(graphml_path)
        self._prepare_graph()
        
    def _prepare_graph(self):
        """Подготовка графа: добавление базовых атрибутов из OSM"""

        for u, v, k, data in self.G.edges(keys=True, data=True):
            highway = data.get("highway", "unknown")
            
            # 1. Категория дороги (0-3)
            self.G[u][v][k]["road_category"] = categorize_road(highway)
            
            # 2. Базовая скорость (если не указана в OSM)
            if "maxspeed" not in data or data["maxspeed"] is None:
                self.G[u][v][k]["maxspeed"] = get_default_speed(highway)
            
            # 3. Количество полос у дороги (если не указано в OSM)
            if "lanes" not in data or data["lanes"] is None:
                self.G[u][v][k]["lanes"] = get_default_lanes(highway)
    
    def _calculate_travel_time(self, length, maxspeed, traffic_level):
        """ Расчет времени проезда
        Логика:
        - traffic_level=0: полная скорость
        - traffic_level=1: едем на 60% от полной скорости
        - traffic_level=2: едем на 30% от полной скорости (пробка)
        """
        
        # Скорость в зависимости от факторов
        speed_factors = {
            0: 1.0,   # Свободно
            1: 0.6,   # Умеренно
            2: 0.3    # Пробка
        }
        
        # Текущая скорость
        actual_speed = maxspeed * speed_factors[traffic_level]
        
        # Расчетное время в минутах
        travel_time = (length / 1000) / actual_speed * 60
        
        # Небольшой шум ±10% (имитация реальных условий)
        noise = np.random.normal(0, travel_time * 0.1)
        travel_time = max(0.1, travel_time + noise)
        
        return travel_time
    
    def generate_dataset(self, num_samples=10000):
        """Генерация датасета"""
        
        edges_list = list(self.G.edges(keys=True))
        rows = []
        
        for i in range(num_samples):
            
            # Случайное ребро
            u, v, k = random.choice(edges_list)
            edge_data = self.G.get_edge_data(u, v, k)
            
            # Извлекаем характеристики
            length = edge_data.get("length", 100)
            road_category = edge_data.get("road_category", 1)
            
            # Скорость
            maxspeed = edge_data.get("maxspeed", 40)
            if isinstance(maxspeed, list):
                maxspeed = maxspeed[0]
            try:
                maxspeed = float(maxspeed)
            except (ValueError, TypeError):
                maxspeed = 40
            
            # Полосы (пока не используются)
            lanes = edge_data.get("lanes", 1)
            if isinstance(lanes, list):
                lanes = lanes[0]
            try:
                lanes = int(lanes)
            except (ValueError, TypeError):
                lanes = 1
            
            # Случайное время
            time_of_day = random.randint(0, 23)
                        
            # Определяем загруженность
            traffic_level = generate_traffic_level(road_category=road_category, hour=time_of_day)
            
            # Рассчитываем время
            travel_time = self._calculate_travel_time(length, maxspeed, traffic_level)
            
            rows.append({
                "length": length,
                "time_of_day": time_of_day,
                "traffic_level": traffic_level,
                "is_peak_hour": is_peak_hour(hour=time_of_day),
                "maxspeed": maxspeed,
                "lanes": lanes,
                "road_category": road_category,
                "travel_time": travel_time
            })
        
        return pd.DataFrame(rows)