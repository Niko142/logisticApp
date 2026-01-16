# Базовый Python-образ
FROM python:3.13-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Устанавливаем системные зависимости
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    g++ \
    python3-dev \
    libproj-dev \
    proj-data \
    proj-bin \
    libgeos-dev \
    ca-certificates \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Рабочий каталог
WORKDIR /app

# Копируем файл с зависимостями
COPY app/requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект (сохраняя папку app внутри /app)
COPY app ./app

# # Запускаем подготовительный скрипт (он уже будет видеть app как пакет)
# RUN python app/map_loader.py

# # Запуск приложения
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# Создаем скрипт для инициализации при первом запуске
RUN echo '#!/bin/sh\n\
if [ ! -f /app/cache/.initialized ]; then\n\
    echo "Первый запуск - загрузка карты..."\n\
    python app/map_loader.py\n\
    mkdir -p /app/cache && touch /app/cache/.initialized\n\
fi\n\
exec uvicorn app.main:app --host 0.0.0.0 --port 8000' > /entrypoint.sh \
    && chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
