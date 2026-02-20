import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/farmer", "/buyer", "/transporter", "/storage", "/admin"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const demoAuth = req.cookies.get("agrisync_demo_auth")?.value === "1";
  const supabaseToken = req.cookies.get("sb-access-token")?.value;

  if (protectedRoutes.some((route) => path.startsWith(route)) && !demoAuth && !supabaseToken) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/farmer/:path*", "/buyer/:path*", "/transporter/:path*", "/storage/:path*", "/admin/:path*"]
};
