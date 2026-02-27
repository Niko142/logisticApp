import json

from shapely.geometry import LineString

from app.schemas import (
    Coords,
    FeatureProperties,
    RouteSummary,
)


def build_feature_line(*, coords: Coords, properties: FeatureProperties) -> dict:
    """Формируем GeoJSON Feature для линии маршрута"""

    return {
        "type": "Feature",
        "geometry": json.loads(json.dumps(LineString(coords).__geo_interface__)),
        "properties": properties,
    }


def build_feature_collection(features: list[dict], summary: RouteSummary) -> dict:
    """Формируем GeoJSON FeatureCollection для ответа API"""
    return {"type": "FeatureCollection", "features": features, "summary": summary}
