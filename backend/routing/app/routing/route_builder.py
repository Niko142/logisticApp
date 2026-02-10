from app.ml.traffic_model import get_traffic_model
from app.utils.geojson_utils import build_feature_line
from app.utils.traffic_utils import generate_traffic_level


def build_route_features(G, route_nodes: list, hour: int, traffic_model):
    """ Построение GeoJSON features для заданного маршрута.
    Args:
        G: граф дорожной сети
        route_nodes: список узлов маршрута
        hour: текущий час
        traffic_model: обученная ML модель для предсказания времени
    
    Returns:
        tuple: (features, total_length, total_time)
            - features: список GeoJSON features
            - total_length: общая длина маршрута в метрах
            - total_time: общее время в пути в минутах
    """

    traffic_model = get_traffic_model()

    features = []
    total_time = 0
    total_length = 0

    for u, v in zip(route_nodes[:-1], route_nodes[1:]):
        # Получаем данные ребра
        edge_data = list(G.get_edge_data(u, v).values())[0]
        length = edge_data.get("length", 100)
        geometry = edge_data.get("geometry")

        # Формируем координаты
        coords = list(geometry.coords) if geometry else [
            (G.nodes[u]["x"], G.nodes[u]["y"]),
            (G.nodes[v]["x"], G.nodes[v]["y"])
        ]

        road_category = edge_data.get("road_category", 1)

        # Получаем уровень трафика
        traffic_level = generate_traffic_level(
            road_category=edge_data.get("road_category", 1),
            hour=hour
        )

        maxspeed = edge_data.get("maxspeed", 50)
        if isinstance(maxspeed, list):
            maxspeed = maxspeed[0]
        try:
            maxspeed = float(maxspeed)
        except (TypeError, ValueError):
            maxspeed = 50

        predicted_time = traffic_model.predict(
            length=length,
            time_of_day=hour,
            traffic_level=traffic_level,
            maxspeed=maxspeed,
            road_category=road_category
        )

        total_length += length
        total_time += predicted_time

        features.append(
            build_feature_line(
                coords=coords,
                properties={
                    "segment_type": "route",
                    "predicted_time": predicted_time,
                    "traffic_level": traffic_level,
                    "length": length,
                }
            )
        )

    return features, total_length, total_time