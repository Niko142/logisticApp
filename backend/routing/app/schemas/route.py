from datetime import datetime
from typing import Annotated, Literal, TypedDict

from pydantic import BaseModel, Field
from shapely.geometry import Point

# Стратегии
AlternativeStrategy = Literal["penalty", "different_criteria"]
DifferentStrategy = Literal["distance", "simple_traffic"]

# Координаты
Coordinate = Annotated[list[float], Field(min_length=2, max_length=2)]  # 1 координата
Coords = list[tuple[float, float]]  # координаты (lat, lon)

# Сегменты
SegmentType = Literal["start_connection", "route", "end_connection"]


# === GEOJSON ===
class GeometryLine(BaseModel):
    type: Literal["LineString"] = "LineString"
    coordinates: Coords


class FeatureProperties(BaseModel):
    segment_type: SegmentType
    length: float
    traffic_level: int
    predicted_time: float


class RouteFeature(BaseModel):
    type: Literal["Feature"] = "Feature"
    geometry: GeometryLine
    properties: FeatureProperties


# === Запрос ===
class RouteRequest(BaseModel):
    start_point: Coordinate = Field(alias="startPoint")
    end_point: Coordinate = Field(alias="endPoint")
    departure_time: str | None = None
    include_alternatives: bool = False


# === Внутренние Pydantic-модели ===
class RouteInfo(BaseModel):
    features: list[RouteFeature]
    total_length: float
    total_time: float
    strategy: str
    description: str


class RoutesInfo(BaseModel):
    main: RouteInfo
    alternatives: list[RouteInfo] = []


# === Внутренние типы ===
class RouteContext(TypedDict):
    start_node: int
    end_node: int
    start_point: Coordinate
    end_point: Coordinate
    start_proj: Point
    end_proj: Point
    dist_start: float
    dist_end: float
    current_time: datetime
    current_hour: int


class AlternativeData(TypedDict):
    route_nodes: list[int]
    strategy: AlternativeStrategy
    description: str


# === Ответ API ===
class RouteSummary(BaseModel):
    total_length_km: float
    total_predicted_time_min: int
    strategy: str
    description: str


class RouteEntry(BaseModel):
    """Маршрут с финальными features (включая соединительные сегменты) и summary"""

    features: list[RouteFeature]
    summary: RouteSummary


class AlternativeEntry(RouteEntry):
    id: str


class RouteCollection(BaseModel):
    main: RouteEntry
    alternatives: list[AlternativeEntry] = []


class RouteMetadata(BaseModel):
    departure_time: str
    user: str
    has_alternatives: bool


class RouteResponse(BaseModel):
    type: Literal["FeatureCollection"] = "FeatureCollection"
    routes: RouteCollection
    metadata: RouteMetadata


class FeatureCollection(BaseModel):
    type: Literal["FeatureCollection"] = "FeatureCollection"
    features: list[RouteFeature]
    summary: RouteSummary
