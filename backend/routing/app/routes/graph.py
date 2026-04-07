from fastapi import APIRouter, Depends

from app.core.graph import load_graph
from app.middlewares.auth import optional_verify_token
from app.services import GraphService

router = APIRouter(prefix="/graph", tags=["graph"])
G = load_graph()
graph_service = GraphService(G)


@router.get("")
def get_full_graph(current_user=Depends(optional_verify_token)):
    return graph_service.build_geojson(current_user)
