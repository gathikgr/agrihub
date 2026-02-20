import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({ location: z.string().min(2).max(80).default("Hyderabad") });

export async function GET(req: NextRequest) {
  const parsed = querySchema.safeParse({ location: req.nextUrl.searchParams.get("location") || "Hyderabad" });
  if (!parsed.success) return NextResponse.json({ error: "invalid_location" }, { status: 400 });

  const { location } = parsed.data;
  const key = process.env.WEATHER_API_KEY;
  if (!key) return NextResponse.json({ summary: `28°C ${location}` });

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`, {
    cache: "no-store"
  });

  if (!res.ok) return NextResponse.json({ summary: `28°C ${location}` });
  const data = await res.json();
  return NextResponse.json({
    summary: `${Math.round(data.main.temp)}°C ${data.weather[0].main}`,
    humidity: data.main.humidity
  });
}
