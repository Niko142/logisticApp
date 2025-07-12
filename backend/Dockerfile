# Готовый образ Python
FROM python:3.11

ENV PYTHONUNBUFFERED=1

# Устанавливаем системные зависимости, включая сертификаты и инструменты для сборки
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    g++ \
    python3-dev \
    libproj-dev \
    proj-data \
    proj-bin \
    libgeos-dev \
    libgdal-dev \
    gdal-bin \
    libspatialindex-dev \
    ca-certificates \
    curl \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Обновление pip
RUN pip install --upgrade pip

# Рабочий каталог
WORKDIR /app

# Копируем файл с зависимостями в рабочий каталог
COPY requirements.txt .

# Установка зависимостей (черещ зеркало pypi)
RUN pip install --no-cache-dir -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# Копируем файлы в рабочий каталог
COPY . .

# Запускаем скрипт для формирования графа дорог
RUN python map_loader.py

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
