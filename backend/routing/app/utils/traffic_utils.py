import random
from app.utils.time_utils import is_peak_hour

def generate_traffic_level(road_category, hour):
    """ Логика загруженности ориентировочно на основе типа дороги и времени
    Принцип:
    - Крупные дороги (category =3): высокая загруженность в час-пик
    - Средние дороги (category=2): умеренная загруженность
    - Мелкие дороги (category=1): низкая загруженность
    """
    peak = is_peak_hour(hour)

    if road_category == 3:  # Крупные дороги
        if peak:
            # В час-пик: 10% свободно, 30% умеренно, 60% пробка
            weights = [0.1, 0.3, 0.6]
        else:
            # Не в час-пик: 50% свободно, 40% умеренно, 10% пробка
            weights = [0.5, 0.4, 0.1]
        
    elif road_category == 2:  # Средние дороги
        if peak:
            # В час-пик: 20% свободно, 50% умеренно, 30% пробка
            weights = [0.2, 0.5, 0.3]
        else:
            # Не в час-пик: 60% свободно, 30% умеренно, 10% пробка
            weights = [0.6, 0.3, 0.1]
        
    elif road_category == 1:  # Мелкие дороги
        if peak:
            # В час-пик: 40% свободно, 40% умеренно, 20% пробка
            weights = [0.4, 0.4, 0.2]
        else:
            # Не в час-пик: 80% свободно, 15% умеренно, 5% пробка
            weights = [0.8, 0.15, 0.05]

    else:  # Остальное
        weights = [0.7, 0.2, 0.1]

    return random.choices([0, 1, 2], weights=weights)[0]
