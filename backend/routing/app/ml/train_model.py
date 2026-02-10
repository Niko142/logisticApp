import sys

from app.ml.dataset import DatasetGenerator
from app.ml.model import TrafficModel

def train(num_samples: int=10000):
    """Обучение модели"""

    print("ОБУЧЕНИЕ МОДЕЛИ")
    print("-"*60)
    
    # 1. Генерация
    print(f"\n[1/3] Генерация датасета ({num_samples} образцов)...")
    generator = DatasetGenerator()
    df = generator.generate_dataset(num_samples)
    
    # 2. Обучение
    print(f"\n[2/3] Обучение модели...")
    model = TrafficModel()
    model.train(df, quick=True)
    
    # 3. Сохранение
    print(f"\n[3/3] Сохранение...")
    model.save()
    
    print("\nМодель обучена и сохранена, файл: traffic_model.pkl")

if __name__ == "__main__":
    # Проверяем аргументы
    samples = 10000
    if len(sys.argv) > 1 and sys.argv[1].startswith("--samples"):
        try:
            samples = int(sys.argv[2])
        except:
            samples = 10000
    
    train(samples)