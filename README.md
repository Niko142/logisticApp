# Оптимизация логистических маршрутов

## Инструкция и установка

### Шаг 1: Клонируем репозиторий

```bash
git clone https://github.com/Niko142/logisticApp.git
```

### Шаг 2: Настройка frontend

Для этого необходимо перейти в нужную папку:

```bash
cd frontend/logisticApp
npm install
```

Запускаем frontend:

```bash
npm run build
npm run preview
```

### Шаг 3: Настройка backend

Запуск backend через Docker:

```bash
docker-compose up --build
```

### Или

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

### Шаг 4: Подгрузка модулей

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

### Шаг 5: Запускаем backend

Поскольку используется FastAPI:

```bash
uvicorn main:app --reload
```
