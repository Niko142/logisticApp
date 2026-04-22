from pathlib import Path
from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict

# Получение относительно пути
BASE_DIR = Path(__file__).resolve().parent.parent

# Создание при необходимости папки data для графа и GeoJSON
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)


class Settings(BaseSettings):
    environment: str = "development"
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    
    dev_origins: Optional[str] = None
    prod_origins: Optional[str] = None
    additional_origins: Optional[str] = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    @property
    def graphml_path(self) -> Path:
        return DATA_DIR / "samara_graph.graphml"

    @property
    def geojson_path(self) -> Path:
        return DATA_DIR / "samara_graph.json"

    @property
    def schemas_path(self) -> Path:
        return BASE_DIR / "schemas.py"

    @property
    def ml_path(self) -> Path:
        return BASE_DIR / "ml" / "traffic_model.pkl"


settings = Settings()
