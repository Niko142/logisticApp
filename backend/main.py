import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from config import GEOJSON_PATH
from routes import route

app = FastAPI()

# Настройка CORS в зависимости от prod или dev
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
IS_PRODUCTION = ENVIRONMENT == "production"

if IS_PRODUCTION:
    # Для production-сборки
    allowed_origins = ["https://logistic-app-psi.vercel.app"]
    allowed_methods = ["GET", "POST", "PUT", "DELETE"]
else:
    # Для dev-режима разработки
    allowed_origins = ["http://localhost:5173"]
    allowed_methods = ["*"]

# Получаем origins из env
additional_origins = os.getenv("ADDITIONAL_ORIGINS", "")
if additional_origins:
    allowed_origins.extend(additional_origins.split(","))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=allowed_methods,
    allow_headers=["*"],
)

app.include_router(route.router, prefix='/api')

@app.get("/")
def root():
    return {"message": "Backend-сервер работает!"}