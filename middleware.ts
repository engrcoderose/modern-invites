import { NextResponse, type NextRequest } from "next/server";

import { updateSupabaseSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Subdomain roots are rewritten after middleware. Direct requests to these
  // retired page paths must not serve a second copy of these invitations.
  const pathname = request.nextUrl.pathname.replace(/\/+$/, "");
  if ([
    "/mario-and-inah", "/edcel-and-apreal", "/jaydee-and-bea",
    "/marian-and-deejay", "/marian-and-deejay/calendar",
    "/marian-and-dee-jay", "/marian-and-dee-jay/calendar",
  ].includes(pathname)) {
    // Next's server URL may use its internal loopback address. For local
    // production previews, check the incoming host rather than that address.
    const hostname = pathname !== "/mario-and-inah"
      ? (request.headers.get("host") ?? request.nextUrl.host).replace(/:\d+$/, "").toLowerCase()
      : request.nextUrl.hostname;
    const localPreview = ["localhost", "127.0.0.1", "[::1]"].includes(hostname);
    // These invitations also allow local production previews.
    // Keep Mario & Inah's existing development-only exception unchanged.
    if (localPreview && (pathname !== "/mario-and-inah" || process.env.NODE_ENV === "development")) {
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
    "/edcel-and-apreal",
    "/jaydee-and-bea",
    "/marian-and-deejay",
    "/marian-and-deejay/calendar",
    "/marian-and-dee-jay",
    "/marian-and-dee-jay/calendar",
    "/admin/:path*",
    "/dashboard/:path*",
    "/api/dashboard/:path*",
    "/client-login",
  ],
};
