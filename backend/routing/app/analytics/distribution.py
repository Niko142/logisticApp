from app.constants import TRAFFIC_LABELS
from app.schemas.analytics import TrafficDistributionItem
from app.utils.traffic_utils import generate_traffic_level


def count_traffic_levels(G, hour: int) -> dict[int, int]:
    """Подсчет распределения загруженности по всем ребрам графа в текущий час"""

    edge_counts = {0: 0, 1: 0, 2: 0}

    for u, v, k in G.edges(keys=True):
        edge_data = G.get_edge_data(u, v, k)
        if not isinstance(edge_data, dict):
            continue

        level = generate_traffic_level(
            road_category=edge_data.get("road_category", 1),
            hour=hour,
        )
        edge_counts[level] += 1

    return edge_counts


def counts_to_percentages(counts: dict[int, int]) -> list[TrafficDistributionItem]:
    """Конвертация счетчиков в проценты"""

    total = sum(counts.values())
    if total == 0:
        return []

    return [
        TrafficDistributionItem(
            level=level,
            name=TRAFFIC_LABELS[level],
            value=round(counts[level] / total * 100, 1),
        )
        for level in sorted(counts)
    ]


def build_distribution(G, hour: int) -> list[TrafficDistributionItem]:
    counts = count_traffic_levels(G, hour)
    return counts_to_percentages(counts)
