from app.analytics.distribution import count_traffic_levels
from app.constants import DAILY_INTERVALS, WEEKLY_DAYS
from app.schemas.analytics import TrafficTimeseriesPoint, TrafficTimeseriesResponse


def _score_for_hour(G, hour: int) -> float:
    """Рассчитывает интегральный показатель загруженности для заданного часа"""
    counts = count_traffic_levels(G, hour)
    total_edges = sum(counts.values())

    if total_edges == 0:
        return 0.0

    weighted_sum = 0 * counts[0] + 1 * counts[1] + 2 * counts[2]
    score = (weighted_sum / (2 * total_edges)) * 10

    return round(score, 2)


def build_timeseries(G) -> TrafficTimeseriesResponse:
    """"""
    daily = []
    for interval in DAILY_INTERVALS:
        representative_hour = (interval.hours.start + interval.hours.stop) // 2
        daily.append(
            TrafficTimeseriesPoint(
                label=interval.label,
                score=_score_for_hour(G, representative_hour),
            )
        )

    weekly = []
    for day in WEEKLY_DAYS:
        weekly.append(
            TrafficTimeseriesPoint(
                label=day.label,
                score=_score_for_hour(G, day.representative_hour),
            )
        )

    return TrafficTimeseriesResponse(
        daily=daily,
        weekly=weekly,
    )
