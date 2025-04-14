from fastapi import APIRouter
from pydantic import BaseModel
import osmnx as ox
import networkx as nx
from config import GRAPHML_PATH
import json
from shapely.geometry import LineString
from fastapi.responses import JSONResponse

router = APIRouter()

# Загрузка графа
G = ox.load_graphml(GRAPHML_PATH)

class RouteRequest(BaseModel):
    start: list[float]  # [lat, lon]
    end: list[float]

@router.post("/route")
def get_route(data: RouteRequest):
    try:
        orig_node = ox.nearest_nodes(G, data.start[1], data.start[0])
        dest_node = ox.nearest_nodes(G, data.end[1], data.end[0])

        route = nx.shortest_path(G, orig_node, dest_node, weight="length")

        # Получение координаты маршрута
        route_coords = []
        for u, v in zip(route[:-1], route[1:]):
            edge_data = G.get_edge_data(u, v)[0]
            geometry = edge_data.get("geometry")
            if geometry:
                route_coords.extend(geometry.coords)
            else:
                # Если нет геометрии, просто от узла до узла
                route_coords.extend([(G.nodes[u]['x'], G.nodes[u]['y']), (G.nodes[v]['x'], G.nodes[v]['y'])])

        # Создаем GeoJSON
        line = LineString(route_coords)
        feature = {
            "type": "Feature",
            "geometry": json.loads(json.dumps(line.__geo_interface__)),
            "properties": {"length": sum(nx.get_edge_attributes(G, 'length').get((u, v, 0), 0) for u, v in zip(route[:-1], route[1:]))}
        }

        return JSONResponse(content={"type": "FeatureCollection", "features": [feature]})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
