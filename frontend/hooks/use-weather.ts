"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useWeather(location: string) {
  return useQuery({
    queryKey: ["weather", location],
    queryFn: async () => (await api.get(`/weather?location=${encodeURIComponent(location)}`)).data
  });
}
