import pickle
import pandas as pd
from datetime import datetime, timedelta
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "currency_model.pkl")

model = pickle.load(open(model_path, "rb"))

future = model.make_future_dataframe(periods=7)
forecast = model.predict(future)

trend = forecast['yhat'].tail(7).reset_index(drop=True)

current_rate = 92.38
base_value = forecast['yhat'].iloc[-8]

trend_adjustment = trend - base_value
predictions = current_rate + trend_adjustment

today = datetime.today()
dates = [(today + timedelta(days=i+1)).strftime("%d/%m") for i in range(7)]

result = {
    "labels": dates,
    "predictions": predictions.tolist()
}

print(json.dumps(result))