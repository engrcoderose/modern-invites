import "server-only";

import { NextRequest, NextResponse } from "next/server";

import {
  isCrossSiteRequest,
  MemoryRateLimiter,
  type RateLimitRule,
} from "./security";

interface RsvpRequestPolicy {
  scope: string;
  rateLimit: RateLimitRule;
  maximumBodyBytes?: number;
}

const globalRateLimit = globalThis as typeof globalThis & {
  __modernInvitesRsvpRateLimiter?: MemoryRateLimiter;
};

const rateLimiter =
  globalRateLimit.__modernInvitesRsvpRateLimiter ?? new MemoryRateLimiter();

if (process.env.NODE_ENV !== "production") {
  globalRateLimit.__modernInvitesRsvpRateLimiter = rateLimiter;
}

function getClientIdentifier(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown-client"
  );
}

function errorResponse(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json(
    { success: false, message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...headers,
      },
    },
  );
}

export function enforceRsvpRequestPolicy(
  request: NextRequest,
  {
    scope,
    rateLimit,
    maximumBodyBytes = 32 * 1024,
  }: RsvpRequestPolicy,
) {
  const contentLength = Number(request.headers.get("content-length"));
  const contentType = request.headers.get("content-type");

  if (!contentType?.toLowerCase().startsWith("application/json")) {
    return errorResponse("The request must contain JSON.", 415);
  }

  if (Number.isFinite(contentLength) && contentLength > maximumBodyBytes) {
    return errorResponse("The request is too large.", 413);
  }

  if (
    isCrossSiteRequest({
      origin: request.headers.get("origin"),
      host: request.headers.get("host"),
      forwardedHost: request.headers.get("x-forwarded-host"),
      fetchSite: request.headers.get("sec-fetch-site"),
    })
  ) {
    return errorResponse("This request is not allowed.", 403);
  }

  const clientIdentifier = getClientIdentifier(request);
  const result = rateLimiter.check(
    `${scope}:${clientIdentifier}`,
    rateLimit,
  );

  if (!result.allowed) {
    return errorResponse(
      "Too many attempts. Please wait a few minutes and try again.",
      429,
      { "Retry-After": String(result.retryAfterSeconds) },
    );
  }

  return null;
}
