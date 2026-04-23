from fastapi import APIRouter, Request

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/traffic-distribution")
def traffic_distribution(req: Request):
    return req.app.state.analytics_service.get_traffic_distribution()


@router.get("/traffic-timeseries")
def traffic_timeseries(req: Request):
    return req.app.state.analytics_service.get_traffic_timeseries()


@router.get("/traffic-heatmap")
def traffic_heatmap(req: Request):
    return req.app.state.analytics_service.get_summary()
