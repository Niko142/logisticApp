from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import JSONResponse

from app.core.security import verify_token
from app.routing.main import build_routes
from app.schemas import RouteRequest
from app.services import build_response

router = APIRouter(prefix="/routes", tags=["routing"])


@router.post("")
def create_route(req: Request, data: RouteRequest, current_user=Depends(verify_token)):
    """
    Построение маршрута (только для авторизованных пользователей)
    """
    try:
        routing_service = req.app.state.routing_service
        G = req.app.state.graph

        route_context = routing_service.resolve_route_context(data)

        routes_data = build_routes(
            G=G,
            start_node=route_context["start_node"],
            end_node=route_context["end_node"],
            hour=route_context["current_hour"],
            include_alternatives=False,
        )

        # Формируем ответ
        return build_response(
            route=routes_data["main"],
            route_context=route_context,
            user=current_user,
            include_alternatives=False,
        )

    except Exception as e:
        import traceback

        traceback.print_exc()
        return JSONResponse(
            content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@router.post("/alternatives")
def get_alternatives(
    req: Request, data: RouteRequest, current_user=Depends(verify_token)
):
    """
    Формирование альтернативного маршрута (только для авторизированных пользователей)
    """
    try:
        routing_service = req.app.state.routing_service
        G = req.app.state.graph

        route_context = routing_service.resolve_route_context(data)

        routes_data = build_routes(
            G=G,
            start_node=route_context["start_node"],
            end_node=route_context["end_node"],
            hour=route_context["current_hour"],
            include_alternatives=True,
        )

        # Формируем ответ
        return build_response(
            route=routes_data["main"],
            route_context=route_context,
            user=current_user,
            include_alternatives=True,
            alternatives=routes_data.get("alternatives", []),
        )

    except Exception as e:
        return JSONResponse(
            content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
