from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os

from app.config import GEOJSON_PATH
from app.routes import api

app = FastAPI()

# === Конфигурация CORS ===
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
IS_PRODUCTION = ENVIRONMENT == "production"

def get_allowed_origins():
    """Получить разрешенные origins в зависимости от окружения"""
    origins = []
    
    if IS_PRODUCTION:
        prod_origins = os.getenv("PROD_ORIGINS", "")
        if prod_origins:
            origins.extend([o.strip() for o in prod_origins.split(",")])
    else:
        dev_origins = os.getenv("DEV_ORIGINS", "")
        if dev_origins:
            origins.extend([o.strip() for o in dev_origins.split(",")])
        else:
            # При условии, если не указано в .env
            origins = [
                "http://localhost:5173",
                "http://localhost:4173",
                "http://localhost:80",
                "http://127.0.0.1:5173",
            ]
    
    # Дополнительные origins (для staging, preview и т.д.)
    additional = os.getenv("ADDITIONAL_ORIGINS", "")
    if additional:
        origins.extend([o.strip() for o in additional.split(",")])
    
    return origins

allowed_origins = get_allowed_origins()
allowed_methods = ["GET", "POST", "PUT", "DELETE"] if IS_PRODUCTION else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=allowed_methods,
    allow_headers=["*"],
)

app.include_router(api.router, prefix="/api")

@app.get("/")
def root():
    return {
        "message": "Routing Backend-сервер успешно работает!",
        "environment": ENVIRONMENT,
        "allowed_origins": allowed_origins
    }