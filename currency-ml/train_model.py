import pandas as pd
from prophet import Prophet
import pickle

print("Loading dataset...")

# load cleaned dataset
df = pd.read_csv("clean_currency.csv")

print("First rows of dataset:")
print(df.head())

# initialize model
model = Prophet(
    daily_seasonality=True,
    yearly_seasonality=True
)

print("Training model...")

# train model
model.fit(df)

print("Saving model...")

# save trained model
with open("currency_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved successfully!")