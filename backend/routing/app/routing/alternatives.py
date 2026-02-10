from app.routing.strategies import AlternativeStrategy, build_alternative_with_strategy

def build_alternative_routes(
    G,
    start_node: int,
    end_node: int,
    main_route_nodes: list,
    strategies: list[AlternativeStrategy] = None,
    hour: int = None
) -> list[dict]:
    """
    Построение альтернативных маршрутов с использованием различных стратегий.
    
    Args:
        G: граф дорожной сети
        start_node: начальный узел
        end_node: конечный узел
        main_route_nodes: узлы основного маршрута
        strategies: список стратегий для применения
        hour: текущий час (для стратегий, зависящих от времени)
    
    Returns:
        List[dict]: список альтернативных маршрутов с метаданными
            [
                {
                    "route_nodes": [...],
                    "strategy": "penalty",
                    "description": "Альтернативный путь"
                },
                ...
            ]
    """

    # Стратегии по умолчанию
    if strategies is None:
        strategies = ["penalty", "different_criteria"]
    
    alternatives = []
    
    for strategy in strategies:
        if strategy == "penalty":
            # Стратегия штрафования основного маршрута
            route_nodes = build_alternative_with_strategy(
                G=G,
                start_node=start_node,
                end_node=end_node,
                strategy="penalty",
                main_route_nodes=main_route_nodes,
                penalty_factor=1.5
            )
            
            if route_nodes and route_nodes != main_route_nodes:
                alternatives.append({
                    "route_nodes": route_nodes,
                    "strategy": "penalty",
                    "description": "Альтернативный путь через другие дороги"
                })
        
        elif strategy == "different_criteria":
            # Стратегия минимизации расстояния
            route_nodes = build_alternative_with_strategy(
                G=G,
                start_node=start_node,
                end_node=end_node,
                strategy="different_criteria",
                hour=hour,
                criteria="distance"
            )
            
            if route_nodes and route_nodes != main_route_nodes:
                alternatives.append({
                    "route_nodes": route_nodes,
                    "strategy": "different_criteria",
                    "description": "Кратчайший путь по расстоянию"
                })
    
    # Убираем дубликаты маршрутов
    unique_alternatives = []
    seen_routes = set()
    
    for alt in alternatives:
        route_tuple = tuple(alt["route_nodes"])
        if route_tuple not in seen_routes:
            seen_routes.add(route_tuple)
            unique_alternatives.append(alt)
    
    return unique_alternatives