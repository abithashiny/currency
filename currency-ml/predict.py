import pickle
import pandas as pd
from datetime import datetime, timedelta
import json
import os
import sys

from_currency = sys.argv[1] if len(sys.argv) > 1 else "USD"
to_currency = sys.argv[2] if len(sys.argv) > 2 else "INR"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "currency_model.pkl")

model = pickle.load(open(model_path, "rb"))

future = model.make_future_dataframe(periods=7)
forecast = model.predict(future)

trend = forecast['yhat'].tail(7).reset_index(drop=True)

# Set correct current rates (approx or you can fetch later from API)
if from_currency == "EUR":
    current_rate = 106
elif from_currency == "GBP":
    current_rate = 122
elif from_currency == "JPY":
    current_rate = 0.62
else:
    current_rate = 92
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