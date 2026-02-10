"""
Стратегии построения альтернативных маршрутов

Две основные стратегии:
1. PENALTY - штрафует ребра основного маршрута (разнообразие путей)
2. DIFFERENT_CRITERIA - оптимизирует по другим критериям (минимизация расстояния вместо времени)
"""

from typing import Literal
import networkx as nx

from app.types import EdgeData
from app.utils.traffic_utils import generate_traffic_level

AlternativeStrategy = Literal["penalty", "different_criteria"]

class PenaltyStrategy:
    """Стратегия штрафования ребер основного маршрута"""
    
    def __init__(self, penalty_factor: float = 1.5):
        """Args: penalty_factor: коэффициент штрафа для ребер основного маршрута"""
        self.penalty_factor = penalty_factor
    
    def get_weight_function(self, main_route_edges: set, base_weight_func):
        """
        Возвращает функцию весов с учетом штрафов.
        
        Args:
            main_route_edges: множество ребер основного маршрута
            base_weight_func: базовая функция расчета весов
        """
        def penalized_weight(u, v, edge_data):
            weight = base_weight_func(u, v, edge_data)
            if (u, v) in main_route_edges:
                weight *= self.penalty_factor
            return weight
        
        return penalized_weight


class DifferentCriteriaStrategy:
    """Стратегия оптимизации по другому критерию"""
    
    def __init__(self, criteria: Literal["distance", "simple_traffic"] = "distance"):
        """
        Args:
            criteria: критерий оптимизации
                - "distance": минимизация расстояния
                - "simple_traffic": упрощенная модель трафика без ML
        """
        self.criteria = criteria
    
    def get_weight_function(self, hour: int = None):
        """
        Возвращает функцию весов на основе выбранного критерия.
        
        Args:
            hour: текущий час (для simple_traffic)
        """
        if self.criteria == "distance":
            return self._distance_weight
        elif self.criteria == "simple_traffic":
            return lambda u, v, d: self._simple_traffic_weight(d, hour)
        else:
            raise ValueError(f"Неизвестный критерий: {self.criteria}")
    
    @staticmethod
    def _distance_weight(u, v, edge_data: EdgeData) -> float:
        """Вес = длина ребра (игнорирует трафик)"""
        return edge_data.get("length", 100)
    
    @staticmethod
    def _simple_traffic_weight(edge_data: EdgeData, hour: int) -> float:
        """Упрощенная модель трафика без ML предсказаний"""
        length = edge_data.get("length", 100)
        road_category = edge_data.get("road_category", 1)
        
        # Генерируем случайный уровень трафика
        traffic_level = generate_traffic_level(road_category, hour)
        
        # Простые коэффициенты
        traffic_factors = {0: 1.0, 1: 1.3, 2: 1.8}
        
        return length * traffic_factors[traffic_level]


def build_alternative_with_strategy(
    G,
    start_node: int,
    end_node: int,
    strategy: AlternativeStrategy,
    main_route_nodes: list = None,
    hour: int = None,
    **strategy_params
) -> list:
    """
    Построение альтернативного маршрута с использованием выбранной стратегии.
    
    Args:
        G: граф дорожной сети
        start_node: начальный узел
        end_node: конечный узел
        strategy: выбранная стратегия ("penalty" или "different_criteria")
        main_route_nodes: узлы основного маршрута (для penalty)
        hour: текущий час (для different_criteria)
        **strategy_params: дополнительные параметры стратегии
    
    Returns:
        list: список узлов альтернативного маршрута
    """
    
    if strategy == "penalty":
        if main_route_nodes is None:
            raise ValueError("Для стратегии 'penalty' требуется main_route_nodes")
        
        # Создаем множество ребер основного маршрута
        main_edges = set(zip(main_route_nodes[:-1], main_route_nodes[1:]))
        
        # Получаем параметры стратегии
        penalty_factor = strategy_params.get("penalty_factor", 1.5)
        
        # Инициализируем стратегию
        penalty_strategy = PenaltyStrategy(penalty_factor)
        
        # Базовая функция весов (простая длина для альтернатив)
        base_weight = lambda u, v, d: d.get("length", 100)
        
        # Получаем функцию весов с штрафами
        weight_func = penalty_strategy.get_weight_function(main_edges, base_weight)
        
        try:
            path = nx.shortest_path(G, start_node, end_node, weight=weight_func)
            return path
        except nx.NetworkXNoPath:
            return []
    
    elif strategy == "different_criteria":
        # Получаем параметры стратегии
        criteria = strategy_params.get("criteria", "distance")
        
        # Инициализируем стратегию
        criteria_strategy = DifferentCriteriaStrategy(criteria)
        
        # Получаем функцию весов
        weight_func = criteria_strategy.get_weight_function(hour)
        
        try:
            path = nx.shortest_path(G, start_node, end_node, weight=weight_func)
            return path
        except nx.NetworkXNoPath:
            return []
    
    else:
        raise ValueError(f"Неизвестная стратегия: {strategy}")