from ml.dataset import generate_fake_traffic_dataset
from ml.model import TrafficModel

def train():
    df = generate_fake_traffic_dataset()
    model = TrafficModel()
    model.train(df)
    model.save()
    print("Модель обучена и сохранена.")

if __name__ == "__main__":
    train()