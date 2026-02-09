from typing import Literal, TypedDict, Union
from app.types.common import RoadCategory, TrafficLevel, Speed

class EdgeData(TypedDict, total=False):
    length: Union[int, float]
    road_category: RoadCategory
    maxspeed: Speed
    lanes: int
    geometry: object