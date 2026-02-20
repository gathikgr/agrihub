import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  role: z.enum(["farmer", "buyer", "transporter", "storage_provider", "admin"])
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_role" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true, role: parsed.data.role });
  res.cookies.set("agrisync_demo_auth", "1", { httpOnly: true, sameSite: "lax", path: "/" });
  res.cookies.set("agrisync_demo_role", parsed.data.role, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
