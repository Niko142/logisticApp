# Готовый образ Python
FROM python:3.11

ENV PYTHONUNBUFFERED=1

# Устанавливаем системные зависимости, включая сертификаты и инструменты для сборки
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      ca-certificates \
      curl \
      libffi-dev \
      libssl-dev \
      gcc \
    && rm -rf /var/lib/apt/lists/*

# Обновление pip
RUN pip install --upgrade pip

# Рабочий каталог
WORKDIR /app

COPY requirements.txt .

# Установка зависимостей
RUN pip install --no-cache-dir -r requirements.txt

# Копируем файлы в рабочий каталог
COPY . .

# Запуск
CMD [ "uvicorn", "main:app",  "--host", "0.0.0.0", "--port", "8000"]