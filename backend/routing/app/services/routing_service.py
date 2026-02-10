import osmnx as ox
from app.types import RouteRequest
from app.utils.graph_utils import project_point, pick_closer_node
from app.utils.time_utils import parse_datetime

class RoutingService:
    def __init__(self, graph):
        self.G = graph

    def resolve_route_context(self, data: RouteRequest):
        """Подготовка контекста для построения маршрута"""
        # 1. Находим ближайшие ребра
        edge_start = ox.nearest_edges(self.G, X=data.startPoint[1], Y=data.startPoint[0])
        edge_end = ox.nearest_edges(self.G, X=data.endPoint[1], Y=data.endPoint[0])
        u1, v1, k1 = edge_start
        u2, v2, k2 = edge_end

        # 2. Проецируем точки
        start_proj = project_point(self.G, u1, v1, k1, *data.startPoint)
        end_proj = project_point(self.G, u2, v2, k2, *data.endPoint)

        # 3. Расстояния
        dist_start = ox.distance.great_circle(
            data.startPoint[0], data.startPoint[1],
            start_proj.y, start_proj.x
        )
        dist_end = ox.distance.great_circle(
            data.endPoint[0], data.endPoint[1],
            end_proj.y, end_proj.x
        )

        # 4. Ближайшие узлы
        start_node = pick_closer_node(self.G, u1, v1, data.startPoint)
        end_node = pick_closer_node(self.G, u2, v2, data.endPoint)

        # 5. Текущий час
        current_time = parse_datetime(data.departure_time)

        return {
            "start_node": start_node,
            "end_node": end_node,
            "start_point": data.startPoint,
            "end_point": data.endPoint,
            "start_proj": start_proj,
            "end_proj": end_proj,
            "dist_start": dist_start,
            "dist_end": dist_end,
            "current_time": current_time,
            "current_hour": current_time.hour,
        }