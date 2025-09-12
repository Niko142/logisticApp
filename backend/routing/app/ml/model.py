import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import make_scorer
from app.ml.config import MODEL_PATH

class TrafficModel:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)

    def train(self, df):
        X = df[["length", "time_of_day", "traffic_level", "is_peak_hour"]]
        y = df["travel_time"]

        # Функция для подсчета успешных предсказаний
        def success_scorer(y_true, y_pred):
            errors = abs(y_true - y_pred) <= 1
            return errors.mean()

        # Параметры для подбора
        param_grid = {
            'n_estimators': [100, 200, 300],        # Количество деревьев
            'max_depth': [None, 10, 20, 30],        # Максимальная глубина дерева
            'min_samples_split': [2, 5, 10],        # Минимальное количество образцов для разделения
            'min_samples_leaf': [1, 2, 4],          # Минимальное количество образцов в листьях
            'max_features': ['auto', 'sqrt', 'log2'],  # Количество признаков для разделения
            'bootstrap': [True, False]              # Использование bootstrap
        }

        # Подбор гиперпараметров с использованием custom-счетчика
        grid_search = GridSearchCV(estimator=self.model, param_grid=param_grid, 
                                   cv=3, scoring=make_scorer(success_scorer), verbose=2, n_jobs=-1)
        grid_search.fit(X, y)

        print(f"Лучшие параметры: {grid_search.best_params_}")

        self.model = grid_search.best_estimator_
        self.model.fit(X, y)

    def predict(self, length, time_of_day, traffic_level):
        peak = 1 if time_of_day in [7, 8, 9, 17, 18, 19] else 0
       
        X = pd.DataFrame([{
            "length": length,
            "time_of_day": time_of_day,
            "traffic_level": traffic_level,
            "is_peak_hour": peak
        }])
        return self.model.predict(X)[0]


    def save(self, path=MODEL_PATH):
        joblib.dump(self.model, path)

    def load(self, path=MODEL_PATH):
        self.model = joblib.load(path)
