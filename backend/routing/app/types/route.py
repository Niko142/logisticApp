from pydantic import BaseModel
from shapely.geometry import Point
from typing import Optional, TypedDict

class RouteRequest(BaseModel):
    startPoint: list[float]
    endPoint: list[float]
    departure_time: Optional[str] = None
    include_alternatives: bool = False

class RouteContext(TypedDict, total=False):
    start_node: int
    end_node: int
    start_point: list[float]
    end_point: list[float]
    start_proj: Point
    end_proj: Point
    dist_start: float
    dist_end: float
    current_time: str
    current_hour: int