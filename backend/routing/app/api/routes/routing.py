from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import JSONResponse

from app.core.security import verify_token
from app.schemas.route import RouteRequest

router = APIRouter(prefix="/routes", tags=["routing"])


@router.post("")
def create_route(req: Request, data: RouteRequest, current_user=Depends(verify_token)):
    """
    Построение маршрута (только для авторизованных пользователей)
    """
    try:
        routing_service = req.app.state.routing_service

        data.include_alternatives = False

        return routing_service.calculate_route(
            data=data,
            user=current_user,
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

        data.include_alternatives = True

        return routing_service.calculate_route(
            data=data,
            user=current_user,
        )

    except Exception as e:
        return JSONResponse(
            content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
