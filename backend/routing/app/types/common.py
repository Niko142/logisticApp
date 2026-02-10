from typing import Literal, Sequence, Tuple, Union

# Общие типы данных
RoadCategory = Literal[0, 1, 2, 3]  # 0 - прочее, 1 - мелкие, 2 - средние, 3 - крупные
TrafficLevel = Literal[0, 1, 2] # 0 - свободно, 1 - средняя загруженность, 2 - высокая (пробки)

Coords = Sequence[Tuple[float, float]] # координаты (lat, lon)

PredictTime = float # Прогнозируемое время
Speed = Union[int, float] # Максимально допустимая скорость передвижения

HighWayType = Union[str, list[str]] # тип данных для поля "highway" в OSM
