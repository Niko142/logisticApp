from typing import Literal, TypedDict

from pydantic import BaseModel
from shapely.geometry.base import BaseGeometry

from app.schemas import HighWayType, RoadCategory, Speed


class EdgeData(TypedDict, total=False):
    length: float
    road_category: RoadCategory
    maxspeed: Speed
    lanes: int
    geometry: BaseGeometry
    highway: HighWayType


class GraphFeatureProperties(BaseModel):
    length: float | None = None
    traffic_level: int
    highway: str | list[str] | None = None
    maxspeed: float | None = None
    road_category: int | None = None


class Geometry(BaseModel):
    type: Literal["LineString"] = "LineString"
    coordinates: list[tuple[float, float]]


class GraphFeature(BaseModel):
    type: Literal["Feature"] = "Feature"
    geometry: Geometry
    properties: GraphFeatureProperties


class GraphResponse(BaseModel):
    type: Literal["FeatureCollection"] = "FeatureCollection"
    features: list[GraphFeature]

    user_authenticated: bool
    current_hour: int
