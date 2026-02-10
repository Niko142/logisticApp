import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error

from app.ml.config import MODEL_PATH
from app.types import EdgeData, TrafficLevel, RoadCategory, Speed
from app.utils.graph_utils import generate_traffic_level
from app.utils.time_utils import is_peak_hour

class TrafficModel:
    
    def __init__(self):
        """Инициализация модели и рассматриваемых признаков"""
        self.model = joblib.load(MODEL_PATH)
        self.feature_columns = [
            "length",
            "time_of_day",
            "traffic_level",
            "is_peak_hour",
            "maxspeed",
            "road_category"
        ]
    
    def train(self, df: pd.DataFrame, quick: bool=False):
        """Обучение модели на предоставленном датасете"""
        # Проверка признаков
        missing_features = set(self.feature_columns) - set(df.columns)
        if missing_features:
            raise ValueError(f"Отсутствуют необходимые признаки: {missing_features}")
        
        X = df[self.feature_columns]
        y = df["travel_time"]
        
        # Разделение выборки на обучающую и тестовую
        X_train, X_val, y_train, y_val = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        if quick:
            # Быстрое обучение для тестов
            print("\nБыстрое обучение...")
            self.model = RandomForestRegressor(
                n_estimators=150,
                max_depth=15,
                min_samples_split=5,
                min_samples_leaf=2,
                max_features="sqrt",
                random_state=42,
                n_jobs=-1
            )
        else:
            # Стандартное обучение
            print("\nСтандартное обучение...")
            self.model = RandomForestRegressor(
                n_estimators=100,
                random_state=42,
                n_jobs=-1
            )
        
        self.model.fit(X_train, y_train)
        
        # Оценка
        self._evaluate(X_train, y_train, X_val, y_val)
    
    def _evaluate(self, X_train, y_train, X_val, y_val):
        """Оценка модели"""
        
        y_train_pred = self.model.predict(X_train)
        y_val_pred = self.model.predict(X_val)
        
        # Метрики
        train_mae = mean_absolute_error(y_train, y_train_pred)
        val_mae = mean_absolute_error(y_val, y_val_pred)
        
        train_rmse = np.sqrt(mean_squared_error(y_train, y_train_pred))
        val_rmse = np.sqrt(mean_squared_error(y_val, y_val_pred))
        
        train_success = np.mean(np.abs(y_train - y_train_pred) <= 1.0) * 100
        val_success = np.mean(np.abs(y_val - y_val_pred) <= 1.0) * 100

        print("РЕЗУЛЬТАТЫ:")
        print("-"*60)
        
        print("\nОбучающая выборка:")
        print(f"MAE:  {train_mae:.3f} мин")
        print(f"RMSE: {train_rmse:.3f} мин")
        print(f"Точность (±1 мин): {train_success:.1f}%")
        
        print("\nТестовая выборка:")
        print(f"MAE:  {val_mae:.3f} мин")
        print(f"RMSE: {val_rmse:.3f} мин")
        print(f"Точность (±1 мин): {val_success:.1f}%")
        
        # Важность признаков
        print("\nОценка важности признаков:")
        importance = pd.DataFrame({
            "feature": self.feature_columns,
            "importance": self.model.feature_importances_
        }).sort_values("importance", ascending=False)
        
        for _, row in importance.iterrows():
            bar = "█" * int(row["importance"] * 50)
            print(f"  {row['feature']:20s} {row['importance']:.4f} {bar}")
    
    def predict(self, length, time_of_day: int, traffic_level: TrafficLevel, maxspeed:Speed=50, road_category: RoadCategory=1):
        """Прогноз времени проезда"""
                
        X = pd.DataFrame([{
            "length": length,
            "time_of_day": time_of_day,
            "traffic_level": traffic_level,
            "is_peak_hour": is_peak_hour(time_of_day),
            "maxspeed": maxspeed,
            "road_category": road_category
        }])
        return self.model.predict(X)[0]
    
    def save(self, path=MODEL_PATH):
        joblib.dump(self.model, path)
        print(f"\nМодель сохранена: {path}")
    
    def load(self, path=MODEL_PATH):
        self.model = joblib.load(path)
        print(f"\nМодель загружена: {path}")
