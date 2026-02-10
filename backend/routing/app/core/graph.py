import osmnx as ox
from app.config import GRAPHML_PATH
from app.utils.graph_utils import prepare_graph

def load_graph():
    """Инициализация и загрузка экземпляра графа"""
    G = ox.load_graphml(GRAPHML_PATH)
    prepare_graph(G)
    return G