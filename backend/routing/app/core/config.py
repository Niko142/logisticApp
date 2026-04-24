from pathlib import Path

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

    dev_origins: str | None = None
    prod_origins: str | None = None
    additional_origins: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    def _parse_origins(self, value: str | None) -> list[str]:
        """Хелпер для парсинга origins для CORS"""
        if not value:
            return []
        return [o.strip() for o in value.split(",") if o.strip()]

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

    @property
    def is_production(self) -> bool:
        return self.environment == "production"

    @property
    def allowed_origins(self) -> list[str]:
        paths = [
            "http://localhost:5173",
            "http://localhost:4173",
            "http://localhost:80",
            "http://127.0.0.1:5173",
        ]

        env_origins = self.prod_origins if self.is_production else self.dev_origins
        base = self._parse_origins(env_origins) or ([] if self.is_production else paths)

        return base + self._parse_origins(self.additional_origins)

    @property
    def allowed_methods(self) -> list[str]:
        return ["GET", "POST", "PUT", "DELETE"] if self.is_production else ["*"]


settings = Settings()
