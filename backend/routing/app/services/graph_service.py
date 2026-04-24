from app.schemas.graph import (
    Geometry,
    GraphFeature,
    GraphFeatureProperties,
    GraphResponse,
)
from app.utils.time_utils import get_current_hour
from app.utils.traffic_utils import generate_traffic_level


class GraphService:
    def __init__(self, graph):
        self.G = graph

    @staticmethod
    def _normalize_maxspeed(value) -> float | None:
        """Нормализация показателя maxspeed к float виду"""
        if isinstance(value, list):
            value = value[0]

        try:
            return float(value)
        except (TypeError, ValueError):
            return None

    def build(self, current_user) -> GraphResponse:
        """
        Получение GeoJSON о графа с информацией о загруженности дорог
        """

        features: list[GraphFeature] = []

        show_detailed_info = current_user is not None
        current_hour = get_current_hour()

        for u, v, k in self.G.edges(keys=True):
            edge_data = self.G.get_edge_data(u, v, k)
            if not isinstance(edge_data, dict):
                continue

            geometry = edge_data.get("geometry")

            coords = (
                list(geometry.coords)
                if geometry
                else [
                    (self.G.nodes[u]["x"], self.G.nodes[u]["y"]),
                    (self.G.nodes[v]["x"], self.G.nodes[v]["y"]),
                ]
            )

            traffic_level = generate_traffic_level(
                road_category=edge_data.get("road_category", 1), hour=current_hour
            )

            properties = {"traffic_level": traffic_level}

            if show_detailed_info:
                maxspeed = edge_data.get("maxspeed", 40)
                if isinstance(maxspeed, list):
                    maxspeed = maxspeed[0]

                properties.update(
                    {
                        "length": edge_data.get("length", 100),
                        "highway": edge_data.get("highway", "unknown"),
                        "maxspeed": self._normalize_maxspeed(maxspeed),
                        "road_category": edge_data.get("road_category", 1),
                    }
                )

            features.append(
                GraphFeature(
                    geometry=Geometry(coordinates=coords),
                    properties=GraphFeatureProperties(**properties),
                )
            )

        return GraphResponse(
            features=features,
            user_authenticated=current_user is not None,
            current_hour=current_hour,
        )
