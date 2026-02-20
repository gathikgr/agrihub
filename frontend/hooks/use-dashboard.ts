"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useRoleDashboard<T = unknown>(role: "farmer" | "buyer" | "transporter" | "storage" | "admin") {
  return useQuery({
    queryKey: ["dashboard", role],
    queryFn: async () => (await api.get<T>(`/dashboard/${role}`)).data
  });
}
