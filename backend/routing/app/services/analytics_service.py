from app.constants import DAILY_INTERVALS, TRAFFIC_LABELS, WEEKLY_DAYS
from app.utils.time_utils import get_current_hour
from app.utils.traffic_utils import generate_traffic_level


class AnalyticsService:
    def __init__(self, graph):
        self.G = graph

    def _count_traffic_levels(self, current_hour: int) -> dict[int, int]:
        """Подсчет распределения загруженности по всем ребрам графа в текущий час"""

        edge_counts = {0: 0, 1: 0, 2: 0}

        for u, v, k in self.G.edges(keys=True):
            edge_data = self.G.get_edge_data(u, v, k)
            if not isinstance(edge_data, dict):
                continue

            level = generate_traffic_level(
                road_category=edge_data.get("road_category", 1),
                hour=current_hour,
            )
            edge_counts[level] += 1

        return edge_counts

    def _counts_to_percentages(self, counts: dict[int, int]) -> list[dict]:
        """Конвертация счетчиков в проценты"""

        total = sum(counts.values())
        if total == 0:
            return []

        return [
            {
                "level": level,
                "name": TRAFFIC_LABELS[level],
                "value": round(counts[level] / total * 100, 1),
            }
            for level in sorted(counts)
        ]

    def get_traffic_distribution(self) -> list[dict]:
        """Распределение загруженности по категориям в текущий момент"""

        current_hour = get_current_hour()

        counts = self._count_traffic_levels(current_hour)
        return self._counts_to_percentages(counts)

    def get_traffic_timeseries(self) -> dict:
        """Статистика/динамика по интервалам дня и дням недели"""

        daily = []
        for interval in DAILY_INTERVALS:
            representative_hour = (interval.hours.start + interval.hours.stop) // 2
            counts = self._count_traffic_levels(current_hour=representative_hour)
            percentages = self._counts_to_percentages(counts)
            score_percent = next((p["value"] for p in percentages if p["level"] == 2), 0)
            score = round(score_percent / 10, 2)
            daily.append({"label": interval.label, "score": score})

        weekly = []
        for day in WEEKLY_DAYS:
            counts = self._count_traffic_levels(current_hour=day.representative_hour)
            percentages = self._counts_to_percentages(counts)
            score_percent = next((p["value"] for p in percentages if p["level"] == 2), 0)
            score = round(score_percent / 10, 2)
            weekly.append({"label": day.label, "score": score})

        return {"daily": daily, "weekly": weekly}