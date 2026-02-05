from app.utils.traffic_utils import generate_traffic_level

def traffic_weight(edge_data, hour):
    """Функция для назначения весовых коэффициентов ребрам дорожного графа"""
    length = edge_data.get("length", 100)

    traffic_level = generate_traffic_level(
        road_category=edge_data.get("road_category", 1),
        hour=hour
    )

    factors = {0: 1.0, 1: 1.4, 2: 2.2}
    return length * factors[traffic_level]
