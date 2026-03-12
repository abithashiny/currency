import pandas as pd

# load dataset (skip metadata rows)
df = pd.read_csv("exchange_rates.csv", skiprows=5)

# remove spaces
df.columns = df.columns.str.strip()

# select INR column
df = df[["Time Period", "RXI_N.B.IN"]]

# rename columns for Prophet
df.columns = ["ds", "y"]

# remove ND values
df["y"] = pd.to_numeric(df["y"], errors="coerce")

# remove NaN rows
df = df.dropna()

# convert date
df["ds"] = pd.to_datetime(df["ds"])

# save cleaned dataset
df.to_csv("clean_currency.csv", index=False)

print("Dataset cleaned successfully")
print(df.head())