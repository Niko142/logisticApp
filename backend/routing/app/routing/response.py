from app.schemas.route import (
    AlternativeEntry,
    FeatureProperties,
    RouteCollection,
    RouteContext,
    RouteEntry,
    RouteFeature,
    RouteMetadata,
    RouteResponse,
    RoutesInfo,
    RouteSummary,
)
from app.utils.geojson_utils import build_feature_line


def build_route_response(
    routes_data: RoutesInfo,
    context: RouteContext,
    user: dict,
    include_alternatives: bool,
) -> RouteResponse:
    """Формирование основного ответа API с основным и альтернативным маршрутом (опционально)"""

    start_feature, end_feature = _build_connection_features(context)

    main_entry = RouteEntry(
        features=[start_feature, *routes_data.main.features, end_feature],
        summary=_build_summary(routes_data.main, context),
    )

    alternatives = []

    if include_alternatives:
        for idx, alt in enumerate(routes_data.alternatives, start=1):
            alternatives.append(
                AlternativeEntry(
                    id=f"alternative_{idx}",
                    features=[start_feature, *alt.features, end_feature],
                    summary=_build_summary(alt, context),
                )
            )

    return RouteResponse(
        routes=RouteCollection(
            main=main_entry,
            alternatives=alternatives,
        ),
        metadata=RouteMetadata(
            departure_time=context["current_time"].isoformat(),
            user=user["username"],
            has_alternatives=include_alternatives,
        ),
    )


def _build_summary(route_info, context: RouteContext) -> RouteSummary:
    """Формирует краткую сводку по маршруту: длина, время, стратегия, описание"""

    start_time, end_time = _connection_times(context)

    return RouteSummary(
        total_length_km=round(
            (route_info.total_length + context["dist_start"] + context["dist_end"])
            / 1000,
            1,
        ),
        total_predicted_time_min=round(route_info.total_time + start_time + end_time),
        strategy=route_info.strategy,
        description=route_info.description,
    )


def _build_connection_features(
    context: RouteContext,
) -> tuple[RouteFeature, RouteFeature]:
    """Создает GeoJSON-сегменты: для дорисовки и корректности отображения линии маршрута"""

    start_time, end_time = _connection_times(context)

    start_feature = build_feature_line(
        coords=[
            (context["start_point"][1], context["start_point"][0]),
            (context["start_proj"].x, context["start_proj"].y),
        ],
        properties=FeatureProperties(
            segment_type="start_connection",
            length=context["dist_start"],
            traffic_level=0,
            predicted_time=start_time,
        ),
    )

    end_feature = build_feature_line(
        coords=[
            (context["end_proj"].x, context["end_proj"].y),
            (context["end_point"][1], context["end_point"][0]),
        ],
        properties=FeatureProperties(
            segment_type="end_connection",
            length=context["dist_end"],
            traffic_level=0,
            predicted_time=end_time,
        ),
    )

    return start_feature, end_feature


def _connection_times(context: RouteContext) -> tuple[float, float]:
    """Рассчитывает предполагаемое время прохождения соединительных сегментов"""

    return (
        (context["dist_start"] / 50000) * 60,
        (context["dist_end"] / 50000) * 60,
    )
