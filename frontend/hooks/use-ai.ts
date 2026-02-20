"use client";

import { mlApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function usePricePrediction(crop: string) {
  return useQuery({
    queryKey: ["predict-price", crop],
    queryFn: async () => (await mlApi.post("/predict-price", { crop })).data
  });
}

export function useStorageDecision(payload: { crop: string; quantity_tons: number; current_price: number; predicted_price: number }) {
  return useQuery({
    queryKey: ["storage-decision", payload],
    queryFn: async () => (await mlApi.post("/storage-decision", payload)).data
  });
}
