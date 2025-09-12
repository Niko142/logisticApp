from pathlib import Path

# Базовая директория проекта
BASE_DIR = Path(__file__).resolve().parent.parent

# Пути к данным и модели
MODEL_PATH = BASE_DIR / "ml" / "traffic_model.pkl"
