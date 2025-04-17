from fastapi import APIRouter
from pydantic import BaseModel
import osmnx as ox
import networkx as nx
from shapely.geometry import LineString
from fastapi.responses import JSONResponse
from config import GRAPHML_PATH
from ml.model import TrafficModel
from datetime import datetime
import random
import json

router = APIRouter()

# Загрузка графа
G = ox.load_graphml(GRAPHML_PATH)

# Загрузка ML модели
traffic_model = TrafficModel()
traffic_model.load()

class RouteRequest(BaseModel):
    start: list[float]  # [lat, lon]
    end: list[float]

@router.post("/route")
def get_route(data: RouteRequest):
    try:
        # Находим ближайшие узлы
        orig_node = ox.nearest_nodes(G, data.start[1], data.start[0])
        dest_node = ox.nearest_nodes(G, data.end[1], data.end[0])

        # Получаем маршрут по кратчайшей длине
        route = nx.shortest_path(G, orig_node, dest_node, weight="length")

        route_coords = []
        features = []
        total_time = 0
        current_hour = datetime.now().hour

        for u, v in zip(route[:-1], route[1:]):
            edge_data = G.get_edge_data(u, v)[0]
            length = edge_data.get("length", 100)
            geometry = edge_data.get("geometry")

            # Случайная загруженность (0 — свободно, 2 — пробка)
            traffic_level = random.choice([0, 1, 2])

            # Предсказание времени проезда по ребру
            predicted_time = traffic_model.predict(length, current_hour, traffic_level)
            total_time += predicted_time

            coords = list(geometry.coords) if geometry else [
                (G.nodes[u]["x"], G.nodes[u]["y"]),
                (G.nodes[v]["x"], G.nodes[v]["y"])
            ]
            route_coords.extend(coords)

            # Создаём фичу GeoJSON для отображения сегмента
            line = LineString(coords)
            feature = {
                "type": "Feature",
                "geometry": json.loads(json.dumps(line.__geo_interface__)),
                "properties": {
                    "length": length,
                    "traffic_level": traffic_level,
                    "predicted_time": predicted_time
                }
            }
            features.append(feature)

        response = {
            "type": "FeatureCollection",
            "features": features,
            "summary": {
                "total_predicted_time_min": round(total_time, 2)
            }
        }

        return JSONResponse(content=response)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
