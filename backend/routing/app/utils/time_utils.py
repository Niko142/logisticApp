from datetime import datetime
from typing import Optional

PEAK_HOURS: set[int] = {7, 8, 9, 17, 18, 19}

def is_peak_hour(hour: int) -> int:
    """ Проверяем, является ли данное время 'час-пиком' """
    if not 0 <= hour <= 23:
        raise ValueError(f"Час должен быть в диапазоне 0-23, получено: {hour}")
    return 1 if hour in PEAK_HOURS else 0

def parse_datetime(datetime_str: Optional[str], format: str = "%Y-%m-%d %H:%M") -> datetime:
    """Парсит строку с датой или возвращает текущее время"""
    if not datetime_str:
        return datetime.now()
    return datetime.strptime(datetime_str, format)

def get_current_hour() -> int:
    """Возвращает текущий час (0-23)"""
    return datetime.now().hour