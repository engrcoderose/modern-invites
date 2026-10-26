import { NextResponse, type NextRequest } from "next/server";

import { updateSupabaseSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // The new subdomain rewrites its root after middleware. Direct requests to
  // the retired page must not serve a second copy of the invitation.
  if (request.nextUrl.pathname.replace(/\/+$/, "") === "/mario-and-inah") {
    // Keep the usual localhost preview available during development.
    if (process.env.NODE_ENV === "development" && ["localhost", "127.0.0.1", "[::1]"].includes(request.nextUrl.hostname)) {
      return NextResponse.next();
    }
    return new NextResponse("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
  return updateSupabaseSession(request);
}

export const config = {
  matcher: [
    "/mario-and-inah",
    "/admin/:path*",
    "/dashboard/:path*",
    "/api/dashboard/:path*",
    "/client-login",
  ],
};
