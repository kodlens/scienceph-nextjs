// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (maintenanceMode) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};