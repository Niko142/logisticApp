import osmnx as ox
import os
import json
from pathlib import Path
from config import GRAPHML_PATH, GEOJSON_PATH

def download_samara_graph(save_path=GRAPHML_PATH):
    # Выбранная область, город
    place_name = "Samara, Russia"

    # Загрузка дорожной сети
    print("Загружаем данные из OSM...")
    graph = ox.graph_from_place(place_name, network_type="drive")

    # Сохранение файла .graphml
    ox.save_graphml(graph, save_path)
    print(f"Граф сохранён в файл: {save_path}")

    return graph

# преобразование графа в geoJson для frontend-части
def export_to_geojson(graph, filename=GEOJSON_PATH):
    gdf_edges = ox.graph_to_gdfs(graph, nodes=False)
    geojson_data = gdf_edges.to_json()

    # Сохраняем как файл
    Path(filename).parent.mkdir(parents=True, exist_ok=True)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(geojson_data)

    print(f"GeoJSON сформирован и сохранён: {filename}")

# Проверка
if __name__ == "__main__":
    graph = download_samara_graph()
    export_to_geojson(graph)
