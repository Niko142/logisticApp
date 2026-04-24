from typing import NamedTuple

from pydantic import BaseModel


class DayInterval(NamedTuple):
    label: str
    hours: range


class WeekDay(NamedTuple):
    label: str
    representative_hour: int


class TrafficDistributionItem(BaseModel):
    level: int
    name: str
    value: float


class TrafficTimeseriesPoint(BaseModel):
    label: str
    score: float


class TrafficTimeseriesResponse(BaseModel):
    daily: list[TrafficTimeseriesPoint]
    weekly: list[TrafficTimeseriesPoint]


class TrafficSummaryResponse(BaseModel):
    avg_travel_time: float
    avg_load_percent: float
    delta_travel_time: float
    delta_load_percent: float
