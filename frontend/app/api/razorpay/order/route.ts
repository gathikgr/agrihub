import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const orderSchema = z.object({
  amount: z.number().int().positive(),
  receipt: z.string().min(2).max(64)
});

export async function POST(req: NextRequest) {
  const parsed = orderSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_order_payload" }, { status: 400 });
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "razorpay_not_configured" }, { status: 500 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const order = await razorpay.orders.create({
    amount: parsed.data.amount,
    currency: "INR",
    receipt: parsed.data.receipt
  });

  return NextResponse.json(order);
}
