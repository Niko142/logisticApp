from app.analytics.distribution import build_distribution
from app.analytics.summary import build_summary
from app.analytics.timeseries import build_timeseries
from app.schemas.analytics import (
    TrafficDistributionItem,
    TrafficSummaryResponse,
    TrafficTimeseriesResponse,
)
from app.utils.time_utils import get_current_hour


class AnalyticsService:
    def __init__(self, graph):
        self.G = graph

    def get_traffic_distribution(self) -> list[TrafficDistributionItem]:
        """Распределение загруженности по категориям в текущий момент"""

        current_hour = get_current_hour()

        return build_distribution(self.G, current_hour)

    def get_traffic_timeseries(self) -> TrafficTimeseriesResponse:
        """Статистика/динамика по интервалам дня и дням недели с нормализацией 0–10"""

        return build_timeseries(self.G)

    def get_summary(self) -> TrafficSummaryResponse:
        """
        Получение сводной информации об измеряемых метриках и
        их изменениях по сравнению с предыдущим часом
        """

        current_hour = get_current_hour()

        return build_summary(self.G, current_hour)
