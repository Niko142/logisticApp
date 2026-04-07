from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from app.core.graph import load_graph
from app.middlewares.auth import verify_token
from app.routing.main import build_routes
from app.schemas import RouteRequest
from app.services import RoutingService, build_response

router = APIRouter(prefix="/route", tags=["routing"])
G = load_graph()
routing_service = RoutingService(G)


@router.post("")
def get_route(data: RouteRequest, current_user=Depends(verify_token)):
    """
    Построение маршрута (только для авторизованных пользователей)
    """
    try:
        route_context = routing_service.resolve_route_context(data)

        routes_data = build_routes(
            G=G,
            start_node=route_context["start_node"],
            end_node=route_context["end_node"],
            hour=route_context["current_hour"],
            include_alternatives=False,
        )

        # Формируем ответ
        main_route = routes_data["main"]

        return build_response(
            route=main_route,
            route_context=route_context,
            user=current_user,
            include_alternatives=False,
        )

    except Exception as e:
        import traceback

        traceback.print_exc()
        return JSONResponse(content={"error": str(e)}, status_code=500)


@router.post("/alternatives")
def get_alternatives(data: RouteRequest, current_user=Depends(verify_token)):
    """
    Формирование альтернативного маршрута (только для авторизированных пользователей)
    """
    try:
        route_context = routing_service.resolve_route_context(data)

        routes_data = build_routes(
            G=G,
            start_node=route_context["start_node"],
            end_node=route_context["end_node"],
            hour=route_context["current_hour"],
            include_alternatives=True,
        )

        return build_response(
            route=routes_data["main"],
            route_context=route_context,
            user=current_user,
            include_alternatives=True,
            alternatives=routes_data.get("alternatives", []),
        )

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
