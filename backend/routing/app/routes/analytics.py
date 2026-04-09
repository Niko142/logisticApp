from fastapi import APIRouter

from app.core.graph import load_graph
from app.services import AnalyticsService

router = APIRouter(prefix="/analytics", tags=["analytics"])

G = load_graph()

analytics_service = AnalyticsService(G)


@router.get("/traffic-distribution")
def traffic_distribution():
    return analytics_service.get_traffic_distribution()


@router.get("/traffic-timeseries")
def traffic_timeseries():
    return analytics_service.get_traffic_timeseries()


@router.get("/traffic-summary")
def traffic_heatmap():
    return analytics_service.get_summary()
