from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.core.config import settings
from app.core.graph import load_graph
from app.services import AnalyticsService, GraphService, RoutingService


@asynccontextmanager
async def lifespan(app: FastAPI):
    graph = load_graph()

    app.state.graph = graph
    app.state.analytics_service = AnalyticsService(graph)
    app.state.graph_service = GraphService(graph)
    app.state.routing_service = RoutingService(graph)

    yield

    app.state.graph = None


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=settings.allowed_methods,
    allow_headers=["*"],
)

app.include_router(router.router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "Routing-микросервис успешно работает!",
        "environment": settings.environment,
        "allowed_origins": settings.allowed_origins,
    }


@app.get("/health")
async def health():
    return {"status": "ok"}
