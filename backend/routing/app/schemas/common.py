from typing import Literal, Union

# === Общие типы ===
RoadCategory = Literal[0, 1, 2, 3]  # 0 - прочее, 1 - мелкие, 2 - средние, 3 - крупные

TrafficLevel = Literal[
    0, 1, 2
]  # 0 - свободно, 1 - средняя загруженность, 2 - высокая (пробки)

PredictTime = float  # Прогнозируемое время
Speed = Union[int, float]  # Максимально допустимая скорость передвижения

HighWayType = Union[str, list[str]]  # тип данных для поля "highway" в OSM
