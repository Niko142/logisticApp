import sys

from app.core.graph import load_graph
from app.ml.dataset import DatasetGenerator
from app.ml.model import TrafficModel


def train(num_samples: int = 10000):
    """Обучение модели"""

    print("ОБУЧЕНИЕ МОДЕЛИ")
    print("-" * 60)

    # 1. Загрузка графа
    print("\n[1/4] Загрузка графа...")
    G = load_graph()

    # 2. Генерация
    print(f"\n[2/4] Генерация датасета ({num_samples} образцов)...")
    generator = DatasetGenerator(G)
    df = generator.generate_dataset(num_samples)

    # 3. Обучение
    print("\n[3/4] Обучение модели...")
    model = TrafficModel()
    model.train(df, quick=True)

    # 4. Сохранение
    print("\n[4/4] Сохранение...")
    model.save()

    print("\nМодель обучена и сохранена, файл: traffic_model.pkl")


if __name__ == "__main__":
    # Проверяем аргументы
    samples = 10000
    if len(sys.argv) > 1 and sys.argv[1].startswith("--samples"):
        try:
            samples = int(sys.argv[2])
        except ValueError:
            samples = 10000

    train(samples)
