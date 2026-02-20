import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"
});

export const mlApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ML_SERVICE_URL || "http://localhost:8000"
});
