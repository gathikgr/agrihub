import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || ""
  });

  const order = await razorpay.orders.create({
    amount: body.amount,
    currency: "INR",
    receipt: body.receipt
  });

  return NextResponse.json(order);
}
