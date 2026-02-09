import osmnx as ox
from shapely.geometry import LineString, Point
from app.types.common import RoadCategory, HighWayType, Speed
from app.types.graph import EdgeData
from app.utils.traffic_utils import generate_traffic_level

def categorize_road(highway: HighWayType) -> RoadCategory:
    """ Простая разделение дороги на категории:
    3 = крупные дороги
    2 = средние дороги
    1 = мелкие дороги
    0 = остальное
    """
    if isinstance(highway, list):
        highway = highway[0]

    highway = str(highway).lower()

    if any(x in highway for x in ["motorway", "trunk", "primary"]):
        return 3
    elif any(x in highway for x in ["secondary", "tertiary"]):
        return 2
    elif any(x in highway for x in ["residential", "living_street", "service"]):
        return 1
    else:
        return 0

def get_default_speed(highway: HighWayType) -> Speed:
    """Получаем скорость по умолчанию"""
    if isinstance(highway, list):
        highway = highway[0]
    
    highway = str(highway).lower()
    speed_map = {
        "motorway": 90,
        "trunk": 80,
        "primary": 60,
        "secondary": 50,
        "tertiary": 40,
        "residential": 30,
        "living_street": 20,
        "service": 20,
    }
    for key, speed in speed_map.items():
        if key in highway:
            return speed
    
    return 40

def get_default_lanes(highway: HighWayType) -> int:
    """Получаем количество полос у дороги по умолчанию"""
    if isinstance(highway, list):
        highway = highway[0]
    
    highway = str(highway).lower()
    
    if "motorway" in highway:
        return 3
    elif any(x in highway for x in ["trunk", "primary"]):
        return 2
    else:
        return 1

def project_point(G, u: int, v: int, k: int, lat: float, lon: float) -> Point:
    """Функция для формирования проекции точки на ребро графа"""
    edge: EdgeData = G.get_edge_data(u, v, k)
    geom = edge.get("geometry")
    if geom is None:
        geom = LineString([
            (G.nodes[u]["x"], G.nodes[u]["y"]),
            (G.nodes[v]["x"], G.nodes[v]["y"])
        ])
    point = Point(lon, lat)
    return geom.interpolate(geom.project(point))

def pick_closer_node(G, u: int, v: int, point: tuple[float, float]) -> int:
    """Функция выбора ближайшего узла (для достраивания маршрутов)"""
    du = ox.distance.great_circle(
        G.nodes[u]["y"], G.nodes[u]["x"],
        point[0], point[1]
    )
    dv = ox.distance.great_circle(
        G.nodes[v]["y"], G.nodes[v]["x"],
        point[0], point[1]
    )
    return u if du < dv else v

def prepare_graph(G) -> None:
    """Подготовка графа: добавление атрибутов"""

    for u, v, k, data in G.edges(keys=True, data=True):
        highway: HighWayType = data.get("highway", "unknown")

        G[u][v][k]["road_category"] = categorize_road(highway)

        if "maxspeed" not in data or data["maxspeed"] is None:
            G[u][v][k]["maxspeed"] = get_default_speed(highway)