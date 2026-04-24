from app.ml.traffic_model import get_traffic_model
from app.routing.alternative_route import build_alternative_routes
from app.routing.main_route import build_main_route
from app.schemas.route import (
    AlternativeStrategy,
    FeatureProperties,
    RouteFeature,
    RouteInfo,
    RoutesInfo,
)
from app.utils.geojson_utils import build_feature_line
from app.utils.traffic_utils import generate_traffic_level


def build_routes(
    G,
    start_node: int,
    end_node: int,
    hour: int,
    include_alternatives: bool = False,
    strategies: list[AlternativeStrategy] | None = None,
) -> RoutesInfo:
    """Основная функция построения основного и альтернативных маршрутов.

    Args:
        G: граф дорожной сети
        start_node: начальный узел
        end_node: конечный узел
        hour: текущий час
        include_alternatives: включать ли альтернативные маршруты
        strategies: список стратегий для альтернативных маршрутов

    Returns:
        dict: словарь с основным и альтернативными маршрутами
            {
                "main": {
                    "features": [...],
                    "total_length": float,
                    "total_time": float,
                    "strategy": "time_optimized"
                },
                "alternatives": [
                    {
                        "features": [...],
                        "total_length": float,
                        "total_time": float,
                        "strategy": "penalty",
                        "description": "..."
                    },
                    ...
                ]
            }
    """

    # 1. Загрузка экземпляра ML модели
    traffic_model = get_traffic_model()

    # 2. Построение основного маршрута (оптимизация по времени)
    main_route_nodes = build_main_route(G, start_node, end_node, hour)

    main_features, main_length, main_time = build_route_features(
        G, main_route_nodes, hour, traffic_model
    )

    main_result = RouteInfo(
        features=main_features,
        total_length=main_length,
        total_time=main_time,
        strategy="time_optimized",
        description="Оптимальный маршрут по времени",
    )

    alternatives: list[RouteInfo] = []

    # 3. Построение альтернативных маршрутов (если запрошено)
    if include_alternatives:
        alternative_routes_data = build_alternative_routes(
            G=G,
            start_node=start_node,
            end_node=end_node,
            main_route_nodes=main_route_nodes,
            strategies=strategies,
            hour=hour,
        )

        for alt_data in alternative_routes_data:
            features, length, time = build_route_features(
                G, alt_data["route_nodes"], hour, traffic_model
            )

            alternatives.append(
                RouteInfo(
                    features=features,
                    total_length=length,
                    total_time=time,
                    strategy=alt_data["strategy"],
                    description=alt_data["description"],
                )
            )

    return RoutesInfo(main=main_result, alternatives=alternatives)


def build_route_features(
    G, route_nodes: list[int], hour: int, traffic_model
) -> tuple[list[RouteFeature], float, float]:
    """Построение GeoJSON features для заданного маршрута.
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

    features = []
    total_time = 0
    total_length = 0

    for u, v in zip(route_nodes[:-1], route_nodes[1:]):
        # Получаем данные ребра
        edge_data = list(G.get_edge_data(u, v).values())[0]
        length = edge_data.get("length", 100)
        geometry = edge_data.get("geometry")

        # Формируем координаты
        coords = (
            list(geometry.coords)
            if geometry
            else [
                (G.nodes[u]["x"], G.nodes[u]["y"]),
                (G.nodes[v]["x"], G.nodes[v]["y"]),
            ]
        )

        road_category = edge_data.get("road_category", 1)

        # Получаем уровень трафика
        traffic_level = generate_traffic_level(
            road_category=edge_data.get("road_category", 1), hour=hour
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
            road_category=road_category,
        )

        total_length += length
        total_time += predicted_time

        features.append(
            build_feature_line(
                coords=coords,
                properties=FeatureProperties(
                    segment_type="route",
                    predicted_time=predicted_time,
                    traffic_level=traffic_level,
                    length=length,
                ),
            )
        )

    return features, total_length, total_time
