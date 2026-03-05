# Оптимизация логистических маршрутов

## Описание проекта

Данное веб-приложение предназначено для визуализации и оптимизации логистических маршрутов на основе данных о графе дорог г.Самара и ML-модели. Система предоставляет интерактивную карту и прогнозирование времени доставки.

Приложение включает интерфейс для авторизации, визуализации маршрутов, настройки параметров и анализа предсказаний модели (пока что визуал). Основная цель — минимизация времени и затрат при доставке с помощью интеллектуальной маршрутизации.

## Демонстрация проекта

Для наиболее быстрой демонстрации работоспособности проекта произведен deploy серверной и клиентской частей на разных хостингах. Backend размещен на `Render`, а frontend на `Vercel`.

В результате, компоненты успешно взаимодействуют между собой, свидетельствуя о корректно организованной программе.

[Демонстрация проекта](https://logistic-app-psi.vercel.app)

## Установка и запуск проекта

В первую очередь загрузить проект к себе на локальную машину:

```bash
git clone https://github.com/Niko142/logisticApp.git
cd logisticApp
```

### Вариант 1 - запуск через Docker (рекомендуется)

Позволяет запустить все сервисы (`frontend`, `routing-backend`, `auth-backend`, `db`) в одном терминале

#### Запуск проекта

```bash
docker-compose up --build
```

Frontend: `http://localhost:5173`

Routing API: `http://localhost:8000`

Auth API: `http://localhost:3000`

### Вариант 2 - ручная сборка

#### :one: Установка и запуск frontend

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

#### :two: Установка и запуск auth-сервиса

Переходим в папку `auth`:

```bash
cd backend/auth
```

Устанавливаем зависимости и собираем проект:

```bash
npm install
npm run build
```

Запускаем production-версию:

```bash
npm run start
```

#### :three: Установка и запуск routing-сервиса

Переходим в папку `routing`:

```bash
cd backend/routing
```

Устанавливаем зависимости через `uv`:

```bash
uv sync
```

Если `uv` не установлен, то:

```bash
# Linux or MacOS
curl -LsSf https://astral.sh/uv/install.sh | sh
# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

#### :four: Загрузка необходимых модулей

Для корректной работы системы подгружаем граф:

```bash
uv run python -m app.map_loader
```

Для обучения модели (опционально):

```bash
uv run python -m app.ml.train_model
```

Проверка модели:

```bash
uv run python -m app.ml.test_model
```

#### :five: Запуск routing-сервиса

```bash
uv run uvicorn main:app --reload
```

## Стек технологий

**Frontend**:

- React + Router
- TypeScript
- CSS
- Leaflet - визуализация интерактивных карт
- Recharts - визуализация аналитических графиков

**Auth-backend**:

- Node.js/TypeScript
- Express
- TypeORM + PostgreSQL
- JWT + Passport.js

**Routing-backend**:

- Python + FastAPI + Uvicorn
- uv - менеджер зависимостей и запуска сервиса
- Scikit-learn - ML-модель на базе Random Forest
- NetworkX - алгоритм поиска маршрутов
- OSMnx - Географические данные

**Прочее**:

- Vite - сборщик клиентской части
- Docker + Nginx - контейнеризация и проксирование запросов
- Vercel - деплой frontend-части
- Render - деплой backend-сервисов
- Supabase - хостинг БД в production

## Database & migrations

## Дальнейшие планы

Планируется доработка отдельных экранных форм (окно прогнозирования и настроек), а также полноценную реализацию аналитики.

Также, хочу избавиться от необходимости применения синтетических данных получением `API` для получения данных о загруженности в формате реального времени.
