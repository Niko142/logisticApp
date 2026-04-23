from fastapi import APIRouter

from app.api.routes import analytics, graph, routing

router = APIRouter()

router.include_router(graph.router)
router.include_router(routing.router)
router.include_router(analytics.router)
