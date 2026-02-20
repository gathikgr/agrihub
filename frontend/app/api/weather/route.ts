import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const location = req.nextUrl.searchParams.get("location") || "Hyderabad";
  const key = process.env.WEATHER_API_KEY;
  if (!key) return NextResponse.json({ summary: `28°C ${location}` });

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`);
  const data = await res.json();
  return NextResponse.json({
    summary: `${Math.round(data.main.temp)}°C ${data.weather[0].main}`,
    humidity: data.main.humidity
  });
}
