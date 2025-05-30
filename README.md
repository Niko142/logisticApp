# Оптимизация логистических маршрутов

## Установка и запуск проекта

В первую очередь загрузить проект к себе на локальную машину:

```bash
git clone https://github.com/Niko142/logisticApp.git
cd logisticApp
```

### Вариант 1 - запуск через Docker

Позволяет запустить frontend и backend в одном терминале

#### Шаг 1: Запуск проекта

```bash
docker-compose up --build
```

### Вариант 2 - ручная сборка

#### Шаг 1: Установка и запуск frontend

Для начала переходим в нужную папку:

```bash
cd frontend/logisticApp
npm install
```

Сборка и запуск production-версии:

```bash
npm run build
npm run preview
```

#### Шаг 2: Установка и запуск backend

Переходим в папку backend:

```bash
cd backend
```

Формируем виртуальное окружение:

```bash
python -m venv .venv
```

Теперь активируем его и устанавливаем зависимости:

```bash
.\.venv\Scripts\activate
pip install -r requirements.txt
```

#### Шаг 3: Подгрузка модулей

Для корректной работы системы подгружаем граф:

```bash
python map_loader.py
```

Для обучения модели (сама модель сформирована) можно применить следующий модуль:

```bash
python -m ml.train_model
```

Проверка модели:

```bash
python -m ml.test_model
```

#### Шаг 4: Запуск backend (если не применяется Docker)

Поскольку используется FastAPI:

```bash
uvicorn main:app --reload
```
