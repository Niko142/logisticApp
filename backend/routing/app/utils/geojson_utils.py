import json
from shapely.geometry import LineString

def build_feature_line(coords, segment_type, predicted_time, traffic_level, length=None, extra_props=None):
    """Формируем GeoJSON Feature для линии маршрута"""
    props = {
        "segment_type": segment_type,
        "length": round(length, 1) if length else 0,
        "traffic_level": traffic_level,
        "predicted_time": round(predicted_time, 1)
    }
    if extra_props:
        props.update(extra_props)
    return {
        "type": "Feature",
        "geometry": json.loads(json.dumps(LineString(coords).__geo_interface__)),
        "properties": props
    }

def build_feature_collection(features, summary):
    """Формируем GeoJSON FeatureCollection для ответа API"""
    return {
        "type": "FeatureCollection",
        "features": features,
        "summary": summary
    }
