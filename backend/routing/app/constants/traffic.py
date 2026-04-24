from app.schemas.analytics import DayInterval, WeekDay

TRAFFIC_LABELS = {
    0: "Свободно",
    1: "Средне",
    2: "Пробка",
}

DAILY_INTERVALS = [
    DayInterval("00–03", range(0, 4)),
    DayInterval("04–07", range(4, 8)),
    DayInterval("08–11", range(8, 12)),
    DayInterval("12–15", range(12, 16)),
    DayInterval("16–19", range(16, 20)),
    DayInterval("20–23", range(20, 24)),
]

# Представительный час для каждого дня (нагруженные будни и свободные выходные)
WEEKLY_DAYS = [
    WeekDay("Пн", 8),
    WeekDay("Вт", 8),
    WeekDay("Ср", 8),
    WeekDay("Чт", 8),
    WeekDay("Пт", 8),
    WeekDay("Сб", 12),
    WeekDay("Вс", 12),
]
