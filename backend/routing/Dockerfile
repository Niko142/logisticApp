# Базовый Python-образ
FROM python:3.13-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_SYSTEM_PYTHON=1

# Устанавливаем системные зависимости
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    g++ \
    python3-dev \
    libproj-dev \
    proj-data \
    proj-bin \
    libgeos-dev \
    gcc \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Рабочий каталог
WORKDIR /app

COPY pyproject.toml uv.lock ./

# Установка зависимостей без установки проекта и dev-зависимостей
RUN uv sync --frozen --no-install-project --no-dev --no-cache

# Копируем весь проект (сохраняя папку app внутри /app)
COPY app ./app

# Устанавливаем проект и зависимости для разработки (если нужно)
COPY main.py ./

# Создаем папку для кэша и скрипт для первого запуска
RUN mkdir -p /app/cache

# Скрипт для первого запуска инициализирует кэш и загружает карту, а затем запускает сервер
RUN echo '#!/bin/sh\n\
set -e\n\
if [ ! -f /app/cache/.initialized ]; then\n\
    echo "Первый запуск - загрузка карты..."\n\
    uv run python -m app.map_loader\n\
    touch /app/cache/.initialized\n\
fi\n\
exec uv run uvicorn main:app --host 0.0.0.0 --port 8000\n' > /entrypoint.sh \
    && chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]