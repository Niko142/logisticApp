from datetime import datetime
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
import json
import networkx as nx
import osmnx as ox
from pydantic import BaseModel
import random
from shapely.geometry import LineString, Point

from app.config import GRAPHML_PATH
from app.middlewares.auth import verify_token, optional_verify_token
from app.ml.model import TrafficModel
from app.utils.graph_utils import project_point, prepare_graph, pick_closer_node
from app.utils.geojson_utils import build_feature_collection, build_feature_line
from app.utils.route_utils import traffic_weight
from app.utils.traffic_utils import generate_traffic_level

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

# Вызываем подготовку графа при старте сервера
prepare_graph(G)

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
        start_proj = project_point(G, u1, v1, k1, *data.startPoint)
        end_proj = project_point(G, u2, v2, k2, *data.endPoint)

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
        start_node = pick_closer_node(G, u1, v1, data.startPoint)
        end_node = pick_closer_node(G, u2, v2, data.endPoint)

        current_time = (
            datetime.now() 
            if not data.departure_time 
            else datetime.strptime(data.departure_time, "%Y-%m-%d %H:%M")
        )
        current_hour = current_time.hour

        # Поиск кратчайшего пути, который будет выступать основой для маршрута
        route_nodes = nx.shortest_path(
            G, start_node, end_node, 
            weight=lambda u, v, d: traffic_weight(d, current_hour)
        )

        features = []
        total_time = 0
        total_length = 0

        # Начальный участок
        start_line = LineString([
            (data.startPoint[1], data.startPoint[0]),
            (start_proj.x, start_proj.y)
        ])
        start_time = (dist_start / 50000) * 60
        total_length += dist_start
        total_time += start_time

        features.append(
            build_feature_line(
                coords=[(data.startPoint[1], data.startPoint[0]),(start_proj.x, start_proj.y)],
                segment_type="start_connection",
                predicted_time=start_time,
                traffic_level=0,
                length=dist_start
            )
        )

        # Основной маршрут
        for u, v in zip(route_nodes[:-1], route_nodes[1:]):
            edge_data = list(G.get_edge_data(u, v).values())[0]
            length = edge_data.get("length", 100)
            geometry = edge_data.get("geometry")

            coords = list(geometry.coords) if geometry else [
                (G.nodes[u]["x"], G.nodes[u]["y"]),
                (G.nodes[v]["x"], G.nodes[v]["y"])
            ]

            traffic_level = generate_traffic_level(
                road_category=edge_data.get("road_category", 1),
                hour=current_hour
            )

            maxspeed = edge_data.get("maxspeed", 50)
            if isinstance(maxspeed, list):
                maxspeed = maxspeed[0]
            try:
                maxspeed = float(maxspeed)
            except (ValueError, TypeError):
                maxspeed = 50

            road_category = edge_data.get("road_category", 1)

            predicted_time = traffic_model.predict(
                length=length,
                time_of_day=current_hour,
                traffic_level=traffic_level,
                maxspeed=maxspeed,
                road_category=road_category
            )

            total_length += length
            total_time += predicted_time

            line = LineString(coords)

            features.append(
                build_feature_line(
                    coords=coords,
                    segment_type="route",
                    predicted_time=predicted_time,
                    traffic_level=traffic_level,
                    length=length,
                    extra_props={
                        "maxspeed": maxspeed,
                        "road_category": road_category
                    }
                )
            )
        
        # Конечный участок
        end_line = LineString([
            (end_proj.x, end_proj.y),
            (data.endPoint[1], data.endPoint[0])
        ])
        end_time = (dist_end / 50000) * 60
        total_length += dist_end
        total_time += end_time

        features.append(
            build_feature_line(
                coords=[(end_proj.x, end_proj.y), (data.endPoint[1], data.endPoint[0])],
                segment_type="end_connection",
                predicted_time=end_time,
                traffic_level=0,
                length=dist_end
            )
        )

        # Формируем итоговый GeoJSON
        response = build_feature_collection(
            features=features,
            summary= {
                "total_length_km": round(total_length / 1000, 1),
                "total_predicted_time_min": round(total_time),
                "departure_time": current_time.isoformat(),
                "user": current_user["username"]
            }
        )
        return JSONResponse(content=response)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@router.get("/graph")
def get_full_graph(current_user = Depends(optional_verify_token)):
    """Получение полного графа с информацией о загруженности дорог"""
    features = []
    show_detailed_info = current_user is not None
    current_hour = datetime.now().hour

    for u, v, k in G.edges(keys=True):
        edge_data = G.get_edge_data(u, v, k)
        if not isinstance(edge_data, dict):
            continue

        geometry = edge_data.get("geometry")

        coords = list(geometry.coords) if geometry else [
            (G.nodes[u]["x"], G.nodes[u]["y"]),
            (G.nodes[v]["x"], G.nodes[v]["y"])
        ]

        # Имитация загруженности
        traffic_level = generate_traffic_level(
            road_category=edge_data.get("road_category", 1),
            hour=current_hour
        )

        line = LineString(coords)

        properties = {"traffic_level": traffic_level}

        # Дополнительная информация для авторизованных пользователей
        if show_detailed_info:
            maxspeed = edge_data.get("maxspeed", 40)
            if isinstance(maxspeed, list):
                maxspeed = maxspeed[0]
            properties.update({
                "length": edge_data.get("length", 100),
                "highway": edge_data.get("highway", "unknown"),
                "maxspeed": maxspeed,
                "road_category": edge_data.get("road_category", 1)
            })

        features.append({
            "type": "Feature",
            "geometry": json.loads(json.dumps(line.__geo_interface__)),
            "properties": properties
        })

    geojson = {
        "type": "FeatureCollection",
        "features": features,
        "user_authenticated": current_user is not None,
        "current_hour": current_hour
    }

    return JSONResponse(content=geojson)
