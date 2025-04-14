from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from config import GEOJSON_PATH
from routes import route

app = FastAPI()

# Возможность взаимодействия frontend с API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(route.router, prefix='/api')

@app.get("/graph")
def get_graph():
    return FileResponse(GEOJSON_PATH, media_type="application/json")

@app.get("/")
def root():
    return {"message": "Backend-сервер работает!"}
