import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from ml.config import MODEL_PATH

class TrafficModel:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)

    def train(self, df):
        X = df[["length", "time_of_day", "traffic_level"]]
        y = df["travel_time"]
        self.model.fit(X, y)

    def predict(self, length, time_of_day, traffic_level):
        X = pd.DataFrame([{
            "length": length,
            "time_of_day": time_of_day,
            "traffic_level": traffic_level
        }])
        return self.model.predict(X)[0]


    def save(self, path=MODEL_PATH):
        joblib.dump(self.model, path)

    def load(self, path=MODEL_PATH):
        self.model = joblib.load(path)
