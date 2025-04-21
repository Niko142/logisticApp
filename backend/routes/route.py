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
    start: list[float]
    end: list[float]
    departure_time: str = None

@router.post("/route")
def get_route(data: RouteRequest):
    try:
        orig_node = ox.nearest_nodes(G, data.start[1], data.start[0])
        dest_node = ox.nearest_nodes(G, data.end[1], data.end[0])

        current_time = datetime.now() if not data.departure_time else datetime.strptime(data.departure_time, "%Y-%m-%d %H:%M")
        current_hour = current_time.hour

        # Определение веса маршрута, влияющая на выбранный путь
        def weight_function(u, v, edge_data):
            length = edge_data.get("length", 100)
            traffic_level = edge_data.get("traffic_level", random.choice([0, 1, 2]))
            return length * (1 + traffic_level * 0.5)

        route = nx.shortest_path(G, orig_node, dest_node, weight=weight_function)

        features = []
        total_time = 0
        total_length = 0

        for u, v in zip(route[:-1], route[1:]):
            edge_data = G.get_edge_data(u, v)[0]
            length = edge_data.get("length", 100)
            geometry = edge_data.get("geometry")
            total_length += length

            traffic_level = edge_data.get("traffic_level", random.choice([0, 1, 2]))
            predicted_time = traffic_model.predict(length, current_hour, traffic_level)
            total_time += predicted_time

            # Лог для просмотра выбора маршрута
            # print(f"Путь {u}→{v}: длина={length}, загруженность дороги={traffic_level}, время поездки={predicted_time}")
            coords = list(geometry.coords) if geometry else [
                (G.nodes[u]["x"], G.nodes[u]["y"]),
                (G.nodes[v]["x"], G.nodes[v]["y"])
            ]

            line = LineString(coords)
            feature = {
                "type": "Feature",
                "geometry": json.loads(json.dumps(line.__geo_interface__)),
                "properties": {
                    "length": round(length, 1),
                    "traffic_level": traffic_level,
                    "predicted_time": round(predicted_time, 1),
                    "speed_kmh": round(length / (predicted_time / 3600), 1) if predicted_time > 0 else 0
                }
            }
            features.append(feature)

        response = {
            "type": "FeatureCollection",
            "features": features,
            "summary": {
                "total_length_km": round(total_length / 1000, 1),
                "total_predicted_time_min": round(total_time, 1),
                "average_speed_kmh": round(total_length / (total_time / 60), 1) if total_time > 0 else 0,
                "departure_time": current_time.isoformat()
            }
        }

        return JSONResponse(content=response)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@router.get("/graph")
def get_full_graph():
    features = []

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
        feature = {
            "type": "Feature",
            "geometry": json.loads(json.dumps(line.__geo_interface__)),
            "properties": {
                "traffic_level": traffic_level
            }
        }
        features.append(feature)

    geojson = {
        "type": "FeatureCollection",
        "features": features
    }

    return JSONResponse(content=geojson)
