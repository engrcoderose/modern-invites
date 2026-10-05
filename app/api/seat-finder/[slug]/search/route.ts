import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";
import { findPublishedSeat } from "@/features/seating/infrastructure/public-seating-repository";
import {
  JsonRequestError,
  readLimitedJson,
} from "@/lib/http/read-limited-json";

const schema = z.object({ name: z.string().trim().min(2).max(150) }).strict();
function reply(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, private",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const denied = enforceRsvpRequestPolicy(request, {
    scope: "public-seat-search",
    rateLimit: { limit: 15, windowMs: 60_000 },
    maximumBodyBytes: 2048,
  });
  if (denied) return denied;
  const { slug } = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 100)
    return reply({ message: "Event unavailable." }, 404);
  try {
    const input = await readLimitedJson(request, 2048);
    const parsed = schema.safeParse(input);
    if (!parsed.success)
      return reply({ message: "Enter your full invited name." }, 400);
    return reply(await findPublishedSeat(slug, parsed.data.name));
  } catch (error) {
    if (error instanceof JsonRequestError)
      return reply({ message: error.message }, error.status);
    return reply(
      { message: "Please try again or ask the welcome team for your table." },
      503,
    );
  }
}
