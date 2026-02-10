from fastapi.responses import JSONResponse
import json
from shapely.geometry import LineString

from app.utils.time_utils import get_current_hour
from app.utils.traffic_utils import generate_traffic_level

class GraphService:
    def __init__(self, graph):
        self.G = graph

    def build_geojson(self, current_user):
        """
        Получение GeoJSON о графа с информацией о загруженности дорог
        """
        
        features = []
        show_detailed_info = current_user is not None
        current_hour = get_current_hour()

        for u, v, k in self.G.edges(keys=True):
            edge_data = self.G.get_edge_data(u, v, k)
            if not isinstance(edge_data, dict):
                continue

            geometry = edge_data.get("geometry")

            coords = list(geometry.coords) if geometry else [
                (self.G.nodes[u]["x"], self.G.nodes[u]["y"]),
                (self.G.nodes[v]["x"], self.G.nodes[v]["y"])
            ]

            traffic_level = generate_traffic_level(
                road_category=edge_data.get("road_category", 1),
                hour=current_hour
            )

            line = LineString(coords)
            properties = {"traffic_level": traffic_level}

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