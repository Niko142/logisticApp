from app.schemas.analytics import TrafficSummaryResponse
from app.utils.traffic_utils import generate_traffic_level


def _calculate_metrics(G, hour: int) -> dict[str, float]:
    """
    Рассчитывает среднюю продолжительность поездки и загруженность для указанного часа.

    - Продолжительность поездки на ребре: длина / (макс. скорость * коэфф. загруженности)
    - Коэффициенты скорости: 1.0 (0% загруженности), 0.6 (50%), 0.3 (100%)
    - Загруженность ребра: 0 → 0%, 1 → 50%, 2 → 100%
    - Уровень загруженности зависит от категории дороги и часа (generate_traffic_level)
    """

    travel_times = []
    load_scores = []

    # Соответствие уровня загруженности
    load_map = {0: 0.0, 1: 0.5, 2: 1.0}
    # Коэффициент снижения скорости в зависимости от загруженности
    speed_factors = {0: 1.0, 1: 0.6, 2: 0.3}

    for u, v, k in G.edges(keys=True):
        edge_data = G.get_edge_data(u, v, k)
        if not isinstance(edge_data, dict):
            continue

        level = generate_traffic_level(
            road_category=edge_data.get("road_category", 1),
            hour=hour,
        )

        length = edge_data.get("length", 100)
        maxspeed = edge_data.get("maxspeed", 40)

        if isinstance(maxspeed, list):
            maxspeed = maxspeed[0]

        try:
            maxspeed = float(maxspeed)
        except (TypeError, ValueError):
            maxspeed = 40.0

        # Актуальная скорость с учетом загруженности
        actual_speed = maxspeed * speed_factors[level]

        # Время прохождения одного сегмента в минутах
        travel_time = (length / 1000) / actual_speed * 60

        travel_times.append(travel_time)
        load_scores.append(load_map[level])

    total_edges = len(travel_times)

    if total_edges == 0:
        return {
            "avg_travel_time": 0,
            "avg_load_percent": 0,
        }

    # Среднее время прохождения одного сегмента
    avg_edge_time = sum(travel_times) / total_edges
    # Среднее количество сегментов в одном маршруте
    average_route_edges = 30

    # Среднее время условного маршрута
    avg_travel_time = avg_edge_time * average_route_edges
    # Средний уровень загруженности сети в процентах
    avg_load_percent = (sum(load_scores) / total_edges) * 100

    return {
        "avg_travel_time": round(avg_travel_time, 1),
        "avg_load_percent": round(avg_load_percent, 1),
    }


def build_summary(G, current_hour: int) -> TrafficSummaryResponse:
    prev_hour = (current_hour - 1) % 24

    current_metrics = _calculate_metrics(G, current_hour)
    previous_metrics = _calculate_metrics(G, prev_hour)

    return TrafficSummaryResponse(
        avg_travel_time=current_metrics["avg_travel_time"],
        avg_load_percent=current_metrics["avg_load_percent"],
        delta_travel_time=round(
            current_metrics["avg_travel_time"] - previous_metrics["avg_travel_time"], 2
        ),
        delta_load_percent=round(
            current_metrics["avg_load_percent"] - previous_metrics["avg_load_percent"],
            1,
        ),
    )
