import osmnx as ox

from app.routing.builder import build_routes
from app.routing.response import build_route_response
from app.schemas.route import (
    RouteContext,
    RouteRequest,
    RouteResponse,
)
from app.utils.graph_utils import pick_closer_node, project_point
from app.utils.time_utils import parse_datetime


class RoutingService:
    def __init__(self, graph):
        self.G = graph

    def resolve_route_context(self, data: RouteRequest) -> RouteContext:
        """Подготовка контекста для построения маршрута"""
        # 1. Находим ближайшие ребра
        edge_start = ox.nearest_edges(
            self.G, X=data.start_point[1], Y=data.start_point[0]
        )
        edge_end = ox.nearest_edges(self.G, X=data.end_point[1], Y=data.end_point[0])
        u1, v1, k1 = edge_start
        u2, v2, k2 = edge_end

        # 2. Проецируем точки
        start_proj = project_point(self.G, u1, v1, k1, *data.start_point)
        end_proj = project_point(self.G, u2, v2, k2, *data.end_point)

        # 3. Расстояния
        dist_start = ox.distance.great_circle(
            data.start_point[0], data.start_point[1], start_proj.y, start_proj.x
        )
        dist_end = ox.distance.great_circle(
            data.end_point[0], data.end_point[1], end_proj.y, end_proj.x
        )

        # 4. Ближайшие узлы
        start_node = pick_closer_node(self.G, u1, v1, data.start_point)
        end_node = pick_closer_node(self.G, u2, v2, data.end_point)

        # 5. Текущий час
        current_time = parse_datetime(data.departure_time)

        return RouteContext(
            start_node=start_node,
            end_node=end_node,
            start_point=data.start_point,
            end_point=data.end_point,
            start_proj=start_proj,
            end_proj=end_proj,
            dist_start=dist_start,
            dist_end=dist_end,
            current_time=current_time,
            current_hour=current_time.hour,
        )

    def calculate_route(
        self,
        data: RouteRequest,
        user: dict,
    ) -> RouteResponse:
        """Пайплайн-функция для полного построения маршрута"""

        ctx = self.resolve_route_context(data)

        routes_data = build_routes(
            G=self.G,
            start_node=ctx["start_node"],
            end_node=ctx["end_node"],
            hour=ctx["current_hour"],
            include_alternatives=data.include_alternatives,
        )

        return build_route_response(
            routes_data=routes_data,
            context=ctx,
            user=user,
            include_alternatives=data.include_alternatives,
        )
