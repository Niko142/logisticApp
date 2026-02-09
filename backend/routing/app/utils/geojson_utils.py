import json
from shapely.geometry import LineString
from typing import Optional, Union, Any
from app.types.common import Coords, PredictTime, TrafficLevel, RoadCategory, Speed
from app.types.geo import FeatureProperties, SegmentType, RouteSummary

def build_feature_line(
    *,
    coords: Coords, 
    properties: FeatureProperties
    ) -> dict:
    """Формируем GeoJSON Feature для линии маршрута"""

    return {
        "type": "Feature",
        "geometry": json.loads(json.dumps(LineString(coords).__geo_interface__)),
        "properties": properties
    }

def build_feature_collection(
    features: list[dict], 
    summary: RouteSummary
    ) -> dict:
    """Формируем GeoJSON FeatureCollection для ответа API"""
    return {
        "type": "FeatureCollection",
        "features": features,
        "summary": summary
    }
