from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import numpy as np

app = FastAPI(title="AgriSync ML Service")

class PriceRequest(BaseModel):
    crop: str

class CropRequest(BaseModel):
    location: str
    soil_type: str
    water_availability: str

class StorageRequest(BaseModel):
    crop: str
    quantity_tons: float
    current_price: float
    predicted_price: float

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict-price")
def predict_price(req: PriceRequest):
    base = 2200 if req.crop.lower() == "wheat" else 1800
    deltas = np.array([0, 30, 75, 120, 90, 150, 180], dtype=float)
    series = [{"day": f"D{i+1}", "price": float(base + deltas[i])} for i in range(len(deltas))]
    return {
        "crop": req.crop,
        "current_price": base,
        "predicted_price": float(series[-1]["price"]),
        "series": series,
        "confidence": 0.82
    }

@app.post("/recommend-crop")
def recommend_crop(req: CropRequest):
    if req.soil_type.lower() in ["black", "loamy"] and req.water_availability.lower() == "high":
        crops: List[str] = ["Cotton", "Maize", "Paddy"]
    else:
        crops = ["Millet", "Pulses", "Groundnut"]
    return {"location": req.location, "recommended_crops": crops, "model": "rule+regression"}

@app.post("/storage-decision")
def storage_decision(req: StorageRequest):
    margin = req.predicted_price - req.current_price
    recommendation = "store" if margin > 120 else "sell"
    estimated_profit = (req.predicted_price if recommendation == "store" else req.current_price) * req.quantity_tons * 10
    return {
        "crop": req.crop,
        "recommendation": recommendation,
        "rationale": f"Predicted margin {margin:.2f} per quintal",
        "estimated_profit": round(estimated_profit, 2)
    }
