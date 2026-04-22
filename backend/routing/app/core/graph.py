import osmnx as ox

from app.core.config import settings
from app.utils.graph_utils import prepare_graph


def load_graph():
    """Инициализация и загрузка экземпляра графа"""
    G = ox.load_graphml(settings.graphml_path)
    prepare_graph(G)
    return G
