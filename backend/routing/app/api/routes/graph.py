from fastapi import APIRouter, Depends, Request

from app.core.security import optional_verify_token

router = APIRouter(prefix="/graph", tags=["graph"])


@router.get("")
def get_road_graph(req: Request, current_user=Depends(optional_verify_token)):
    return req.app.state.graph_service.build(current_user)
