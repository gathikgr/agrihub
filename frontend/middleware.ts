import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/farmer", "/buyer", "/transporter", "/storage", "/admin"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token")?.value;
  const path = req.nextUrl.pathname;

  if (protectedRoutes.some((route) => path.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/farmer/:path*", "/buyer/:path*", "/transporter/:path*", "/storage/:path*", "/admin/:path*"]
};
