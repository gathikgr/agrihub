import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ crop: "Wheat", market: "Nizamabad", price: 2240, trend: "up" });
}
