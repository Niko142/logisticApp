PEAK_HOURS: set[int] = {7, 8, 9, 17, 18, 19}

def is_peak_hour(hour: int) -> int:
    """ Проверяем, является ли данное время 'час-пиком' """
    if not 0 <= hour <= 23:
        raise ValueError(f"Час должен быть в диапазоне 0-23, получено: {hour}")
    return 1 if hour in PEAK_HOURS else 0