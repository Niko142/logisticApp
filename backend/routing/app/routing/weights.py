from app.types import EdgeData

def main_route_weight(u, v, d, hour: int):
    length = d.get("length", 100)
    maxspeed = d.get("maxspeed", 50)

    if isinstance(maxspeed, list):
        maxspeed = maxspeed[0]
    try:
        maxspeed = float(maxspeed)
    except:
        maxspeed = 50

    speed_mps = maxspeed * 1000 / 3600 # перевод в м/с
    base_time = length / speed_mps / 60 # время в минутах

    road_category = d.get("road_category", 1)
    traffic_factor = {1: 1.0, 2: 1.3, 3: 1.6}.get(road_category, 1.2)

    return base_time * traffic_factor
