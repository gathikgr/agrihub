"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useMandiPrice() {
  return useQuery({
    queryKey: ["mandi-price"],
    queryFn: async () => (await api.get<{ crop: string; market: string; price: number; trend: string }>("/mandi")).data
  });
}
