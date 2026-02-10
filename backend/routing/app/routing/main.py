from app.ml.traffic_model import get_traffic_model
from app.routing.alternatives import build_alternative_routes
from app.routing.main_route import build_main_route
from app.routing.route_builder import build_route_features

def build_routes(
    G, 
    start_node: int, 
    end_node: int, 
    hour: int, 
    include_alternatives: bool = False,
    strategies: list = None
) -> dict:
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
    
    response = {
        "main": {
            "features": main_features,
            "total_length": main_length,
            "total_time": main_time,
            "strategy": "time_optimized",
            "description": "Оптимальный маршрут по времени"
        }
    }
    
    # 3. Построение альтернативных маршрутов (если запрошено)
    if include_alternatives:
        alternative_routes_data = build_alternative_routes(
            G=G,
            start_node=start_node,
            end_node=end_node,
            main_route_nodes=main_route_nodes,
            strategies=strategies,
            hour=hour
        )
        
        response["alternatives"] = []
        
        for alt_data in alternative_routes_data:
            features, length, time = build_route_features(
                G, alt_data["route_nodes"], hour, traffic_model
            )
            
            response["alternatives"].append({
                "features": features,
                "total_length": length,
                "total_time": time,
                "strategy": alt_data["strategy"],
                "description": alt_data["description"]
            })
    
    return response