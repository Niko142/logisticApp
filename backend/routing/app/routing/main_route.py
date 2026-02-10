import networkx as nx
from app.routing.weights import main_route_weight

def build_main_route(G, start_node: int, end_node: int, hour: int) -> list:
    """Построение основного маршрута с оптимизацией по времени"""
    return nx.shortest_path(
        G,
        start_node,
        end_node,
        weight=lambda u, v, d: main_route_weight(u, v, d, hour)
    )
