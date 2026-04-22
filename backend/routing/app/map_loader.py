import os
from pathlib import Path

import osmnx as ox

from app.core.config import settings

graphml_path = settings.graphml_path
geojson_path = settings.geojson_path


def download_samara_graph(save_path=graphml_path):
    """Загрузка дорожного графа в области г. Самара"""
    # Выбранная область, город
    place_name = "Samara, Russia"

    # Загрузка дорожной сети
    print("\nЗагружаем данные из OSM...")
    G = ox.graph_from_place(place_name, network_type="drive")

    # Сохранение файла .graphml
    ox.save_graphml(G, save_path)
    print(f"Граф сохранен в файл: {save_path}")

    return G


def export_to_geojson(graph, filename=geojson_path):
    """Преобразование графа в GeoJSON-формат"""
    gdf_edges = ox.graph_to_gdfs(graph, nodes=False)
    geojson_data = gdf_edges.to_json()

    # Сохраняем как файл
    Path(filename).parent.mkdir(parents=True, exist_ok=True)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(geojson_data)

    print(f"GeoJSON сформирован и сохранен: {filename}")


# Проверка
if __name__ == "__main__":
    if os.path.exists(graphml_path):
        print("Граф уже существует. Пропуск загрузки.")
    else:
        G = download_samara_graph()
        export_to_geojson(G)
