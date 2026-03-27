from typing import NamedTuple


class DayInterval(NamedTuple):
    label: str
    hours: range


class WeekDay(NamedTuple):
    label: str
    representative_hour: int
