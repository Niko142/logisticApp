from shapely.geometry import LineString

from app.schemas.route import (
    Coords,
    FeatureCollection,
    FeatureProperties,
    GeometryLine,
    RouteFeature,
    RouteSummary,
)


def build_feature_line(
    *, coords: Coords, properties: FeatureProperties
) -> RouteFeature:
    """Формируем GeoJSON Feature для линии маршрута"""

    return RouteFeature(
        geometry=GeometryLine(
            coordinates=[tuple(c) for c in LineString(coords).coords],
        ),
        properties=properties,
    )


def build_feature_collection(
    features: list[RouteFeature], summary: RouteSummary
) -> FeatureCollection:
    """Формируем GeoJSON FeatureCollection для ответа API"""

    return FeatureCollection(
        type="FeatureCollection", features=features, summary=summary
    )
