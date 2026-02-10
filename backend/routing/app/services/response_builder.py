from fastapi.responses import JSONResponse
from typing import Optional

from app.types import RouteContext
from app.utils.geojson_utils import build_feature_line

def build_response(
    route: dict, 
    route_context: RouteContext, 
    user: dict, 
    include_alternatives: bool=False, 
    alternatives: Optional[list]=None):
    """
    Унифицированная сборка ответа для endpoint-запросов о маршрутизации
    """

    # Рассчитываем время соединительных участков (для соединения с маркерами)
    start_time = (route_context["dist_start"] / 50000) * 60
    end_time = (route_context["dist_end"] / 50000) * 60

    # Начальный сегмент
    start_feature = build_feature_line(
        coords=[
            (route_context["start_point"][1], route_context["start_point"][0]),
            (route_context["start_proj"].x, route_context["start_proj"].y)
        ],
        properties={
            "segment_type": "start_connection",
            "length": route_context["dist_start"],
            "traffic_level": 0,
            "predicted_time": start_time
        }
    )
    
    # Конечный сегмент
    end_feature = build_feature_line(
        coords=[
            (route_context["end_proj"].x, route_context["end_proj"].y),
            (route_context["end_point"][1], route_context["end_point"][0])
        ],
        properties={
            "segment_type": "end_connection",
            "length": route_context["dist_end"],
            "traffic_level": 0,
            "predicted_time": end_time
        }
    )

    # Основной маршрут
    main_features = [start_feature] + route["features"] + [end_feature]
    main_total_length = (
        route["total_length"] +
        route_context["dist_start"] +
        route_context["dist_end"]
    )
    main_total_time = (
        route["total_time"] +
        start_time +
        end_time
    )

    # Формируем итоговый ответ
    response = {
        "type": "FeatureCollection",
        "routes": {
            "main": {
                "features": main_features,
                "summary": {
                    "total_length_km": round(main_total_length / 1000, 1),
                    "total_predicted_time_min": round(main_total_time),
                    "strategy": route["strategy"],
                    "description": route["description"]
                }
            }
        },
        "metadata": {
            "departure_time": route_context["current_time"].isoformat(),
            "user": user["username"],
            "has_alternatives": include_alternatives
        }
    }

    # Формируем альтернативный маршрут
    if include_alternatives and alternatives:
        response["routes"]["alternatives"] = []

        for idx, alt_route in enumerate(alternatives, start=1):

            alt_features = [start_feature] + alt_route["features"] + [end_feature]

            alt_total_length = (
                alt_route["total_length"] +
                route_context["dist_start"] +
                route_context["dist_end"]
            )

            alt_total_time = (
                alt_route["total_time"] +
                start_time +
                end_time
            )

            response["routes"]["alternatives"].append({
                "id": f"alternative_{idx}",
                "features": alt_features,
                "summary": {
                    "total_length_km": round(alt_total_length / 1000, 1),
                    "total_predicted_time_min": round(alt_total_time),
                    "strategy": alt_route["strategy"],
                    "description": alt_route["description"]
                }
            })

    return JSONResponse(content=response)

