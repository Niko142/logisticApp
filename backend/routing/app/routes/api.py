from fastapi import APIRouter, Depends
import osmnx as ox
import networkx as nx
from app.ml.model import TrafficModel
from pydantic import BaseModel
from shapely.geometry import LineString, Point
from fastapi.responses import JSONResponse
from app.config import GRAPHML_PATH
import random
import json
from datetime import datetime
from app.middlewares.auth import verify_token, optional_verify_token

# TODO: Добавить историю маршрутов для авторизированных пользователей

router = APIRouter()

# Загрузка графа
G = ox.load_graphml(GRAPHML_PATH)

# Загрузка ML модели
traffic_model = TrafficModel()
traffic_model.load()

class RouteRequest(BaseModel):
    startPoint: list[float]
    endPoint: list[float]
    departure_time: str = None

# Функция выбора ближайшего узла
def pick_closer_node(u, v, point):
    du = ox.distance.great_circle(
        G.nodes[u]["y"], G.nodes[u]["x"],
        point[0], point[1]
    )
    dv = ox.distance.great_circle(
        G.nodes[v]["y"], G.nodes[v]["x"],
        point[0], point[1]
    )
    return u if du < dv else v

# Функция проекции точки на ребро
def project_point(u, v, k, lat, lon):
    edge = G.get_edge_data(u, v, k)
    geom = edge.get("geometry")
    if geom is None:
        geom = LineString([
            (G.nodes[u]["x"], G.nodes[u]["y"]),
            (G.nodes[v]["x"], G.nodes[v]["y"])
        ])
    point = Point(lon, lat)
    return geom.interpolate(geom.project(point))

@router.post("/route")
def get_route(data: RouteRequest, current_user = Depends(verify_token)):
    """
    Построение маршрута (только для авторизованных пользователей)
    """
    try:
        # Находим ближайшие ребра
        edge_start = ox.nearest_edges(
            G, X=data.startPoint[1], Y=data.startPoint[0]
        )
        edge_end = ox.nearest_edges(
            G, X=data.endPoint[1], Y=data.endPoint[0]
        )
        u1, v1, k1 = edge_start
        u2, v2, k2 = edge_end

        # Проецируем точки
        start_proj = project_point(u1, v1, k1, *data.startPoint)
        end_proj = project_point(u2, v2, k2, *data.endPoint)

        # Вычисляем расстояния начальной и конечной точки до проекций
        dist_start = ox.distance.great_circle(
            data.startPoint[0], data.startPoint[1],
            start_proj.y, start_proj.x
        )
        dist_end = ox.distance.great_circle(
            data.endPoint[0], data.endPoint[1],
            end_proj.y, end_proj.x
        )

        # Выбираем ближайшие узлы к проекциям
        start_node = pick_closer_node(u1, v1, data.startPoint)
        end_node = pick_closer_node(u2, v2, data.endPoint)

        current_time = (
            datetime.now() 
            if not data.departure_time 
            else datetime.strptime(data.departure_time, "%Y-%m-%d %H:%M")
        )
        current_hour = current_time.hour

        # Определяем вес маршрута, влияющий на выбор итогового пути
        def weight_function(u, v, edge_data):
            length = edge_data.get("length", 100)
            traffic_level = edge_data.get("traffic_level", random.choice([0, 1, 2]))
            return length * (1 + traffic_level * 0.5)

        # Поиск кратчайшего пути, который будет выступать основой маршрута
        route_nodes = nx.shortest_path(G, start_node, end_node, weight=weight_function)

        features = []
        total_time = 0
        total_length = 0

        # Линия от точки клика до проекции на дороге
        start_line = LineString([
            (data.startPoint[1], data.startPoint[0]),
            (start_proj.x, start_proj.y)
        ])

        # Расчет времени для начального участка
        start_time = (dist_start / 50000) * 60
        total_length += dist_start
        total_time += start_time

        features.append({
            "type": "Feature",
            "geometry": json.loads(json.dumps(start_line.__geo_interface__)),
            "properties": {
                "segment_type": "start_connection",
                "length": round(dist_start, 1),
                "traffic_level": 0,
                "predicted_time": round(start_time, 1),
            }
        })

        # Основной маршрут 
        for u, v in zip(route_nodes[:-1], route_nodes[1:]):
            edge_data = G.get_edge_data(u, v)[0]
            length = edge_data.get("length", 100)
            geometry = edge_data.get("geometry")

            coords = (
                list(geometry.coords)
                if geometry
                else [
                    (G.nodes[u]["x"], G.nodes[u]["y"]),
                    (G.nodes[v]["x"], G.nodes[v]["y"])
                ]
            )

            # Формируем уровень загруженности на основе случайного подбора уровня
            traffic_level = edge_data.get("traffic_level", random.choice([0, 1, 2]))
            predicted_time = traffic_model.predict(length, current_hour, traffic_level)

            total_length += length
            total_time += predicted_time
    
            line = LineString(coords)

            features.append({
                "type": "Feature",
                "geometry": json.loads(json.dumps(line.__geo_interface__)),
                "properties": {
                    "segment_type": "route",
                    "length": round(length, 1),
                    "traffic_level": traffic_level,
                    "predicted_time": round(predicted_time, 1),
                }
            })

        # Линия от проекции на дороге до конечной точки маркера
        end_line = LineString([
            (end_proj.x, end_proj.y),
            (data.endPoint[1], data.endPoint[0])
        ])

        # Расчет времени для конечного участка
        end_time = (dist_end / 50000) * 60
        total_length += dist_end
        total_time += end_time

        features.append({
            "type": "Feature",
            "geometry": json.loads(json.dumps(end_line.__geo_interface__)),
            "properties": {
                "segment_type": "end_connection",
                "length": round(dist_end, 1),
                "traffic_level": 0,
                "predicted_time": round(end_time, 1),
            }
        })
        
        response = {
            "type": "FeatureCollection",
            "features": features,
            "summary": {
                "total_length_km": round(total_length / 1000, 1),
                "total_predicted_time_min": round(total_time),
                "departure_time": current_time.isoformat(),
                "user": current_user["username"]
            }
        }

        return JSONResponse(content=response)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@router.get("/graph")
def get_full_graph(current_user = Depends(optional_verify_token)):
    """Получение полного графа с информацией о загруженности дорог"""
    features = []

    # Для авторизованных пользователей показываем больше деталей
    show_detailed_info = current_user is not None

    for u, v, k in G.edges(keys=True):
        edge_data = G.get_edge_data(u, v, k)
        geometry = edge_data.get("geometry")

        coords = list(geometry.coords) if geometry else [
            (G.nodes[u]["x"], G.nodes[u]["y"]),
            (G.nodes[v]["x"], G.nodes[v]["y"])
        ]

        # Имитация загруженности
        traffic_level = random.choice([0, 1, 2])
        line = LineString(coords)

        properties = {"traffic_level": traffic_level}
        
        # Дополнительная информация для авторизованных пользователей
        if show_detailed_info:
            properties.update({
                "length": edge_data.get("length", 100),
                "highway": edge_data.get("highway", "unknown"),
                "max-speed": edge_data.get("max-speed", "unknown")
            })

        feature = {
            "type": "Feature",
            "geometry": json.loads(json.dumps(line.__geo_interface__)),
            "properties": properties
        }
        features.append(feature)

    geojson = {
        "type": "FeatureCollection",
        "features": features,
        "user_authenticated": current_user is not None
    }

    return JSONResponse(content=geojson)
