from app.ml.model import TrafficModel

_traffic_model: TrafficModel | None = None

def get_traffic_model() -> TrafficModel:
    """
    Возвращает глобальный экземпляр TrafficModel.
    Загружается при первом вызове.
    """
    global _traffic_model
    if _traffic_model is None:
        _traffic_model = TrafficModel()
        _traffic_model.load()
    return _traffic_model
