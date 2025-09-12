from pathlib import Path

# Получение относительно пути
BASE_DIR = Path(__file__).resolve().parent

# Создание при необходимости папки data для графа и GeoJSON
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

# Пути к файлам
GRAPHML_PATH = DATA_DIR / "samara_graph.graphml"
GEOJSON_PATH = DATA_DIR / "samara_graph.json"
