from fastapi import APIRouter, Depends
import osmnx as ox
import networkx as nx
from app.ml.model import TrafficModel
from pydantic import BaseModel
from shapely.geometry import LineString
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

@router.post("/route")
def get_route(data: RouteRequest, current_user = Depends(verify_token)):
    """
    Построение маршрута (только для авторизованных пользователей)
    """
    try:
        orig_node = ox.nearest_nodes(G, data.startPoint[1], data.startPoint[0])
        dest_node = ox.nearest_nodes(G, data.endPoint[1], data.endPoint[0])

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
                "departure_time": current_time.isoformat(),
                "user": current_user["username"]
            }
        }

        return JSONResponse(content=response)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@router.get("/graph")
def get_full_graph(current_user = Depends(optional_verify_token)):
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

        # feature = {
        #     "type": "Feature",
        #     "geometry": json.loads(json.dumps(line.__geo_interface__)),
        #     "properties": {
        #         "traffic_level": traffic_level
        #     }
        # }
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
