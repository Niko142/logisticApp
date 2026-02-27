from typing import TypedDict, Union

from app.schemas import RoadCategory, Speed


class EdgeData(TypedDict, total=False):
    length: Union[int, float]
    road_category: RoadCategory
    maxspeed: Speed
    lanes: int
    geometry: object
