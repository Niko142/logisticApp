from typing import Literal, TypedDict, Union
from app.types.common import PredictTime, RoadCategory, TrafficLevel, Speed

SegmentType = Literal['start_connection', 'route', 'end_connection']

class FeatureProperties(TypedDict, total=False):
    segment_type: SegmentType
    length: Union[int, float]
    traffic_level: TrafficLevel
    predicted_time: PredictTime
    maxspeed: Speed
    road_category: RoadCategory

class RouteSummary(TypedDict):
    total_length_km: float
    total_predicted_time_min: int
    departure_time: str
    user: str