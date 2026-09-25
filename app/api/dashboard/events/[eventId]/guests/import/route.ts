import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getClientAccess } from "@/features/auth/application/get-client-access";
import { createSupabaseClientAuthRepository } from "@/features/auth/infrastructure/supabase-client-auth-repository";
import { validateImportRows } from "@/features/dashboard/domain/guest-import";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enforceRsvpRequestPolicy } from "@/lib/rsvp/request-policy";

const MAX_BODY = 1024 * 1024;
const envelope = z.object({ mode: z.enum(["preview", "import"]), requestId: z.uuid(), rows: z.unknown() });
const resultSchema = z.object({
  guestCount: z.number().int(), invitationCount: z.number().int(),
  issues: z.array(z.object({ rowNumber: z.number(), message: z.string() })),
});

export async function POST(request: NextRequest, context: { params: Promise<{ eventId: string }> }) {
  const blocked = enforceRsvpRequestPolicy(request, { scope: "dashboard-guest-import", maximumBodyBytes: MAX_BODY, rateLimit: { limit: 20, windowMs: 60_000 } });
  if (blocked) return blocked;
  const respond = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
  const { eventId } = await context.params;
  if (!/^[1-9]\d*$/.test(eventId) || !Number.isSafeInteger(Number(eventId))) return respond({ message: "Invalid event." }, 400);
  try {
    const access = await getClientAccess(await createSupabaseClientAuthRepository());
    if (access.status !== "authorized") return respond({ message: "Sign in again to import guests." }, 401);
    // Bound the stream even when the caller omits Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return respond({ message: "Choose a guest list first." }, 400);
    let size = 0;
    let body = "";
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel(); return respond({ message: "The guest list is too large." }, 413); }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    let input: unknown;
    try { input = JSON.parse(body); } catch { return respond({ message: "Invalid guest list." }, 400); }
    const parsed = envelope.safeParse(input);
    if (!parsed.success) return respond({ message: "Invalid import request. Choose the file again." }, 400);
    const validated = validateImportRows(parsed.data.rows);
    if (validated.issues.length) return respond({ message: "Fix the listed rows and choose the file again.", issues: validated.issues }, 400);
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("import_event_guests", {
      p_event_id: Number(eventId), p_request_id: parsed.data.requestId,
      p_rows: validated.rows, p_preview: parsed.data.mode === "preview",
    });
    if (error) {
      console.error("Guest import failed:", { code: error.code });
      if (error.code === "42501") return respond({ message: "Only this event’s owners and editors can import guests." }, 403);
      if (error.code === "PGRST202" || error.code === "42883") return respond({ message: "Guest import is not set up yet. Ask your administrator to apply the RSVP guest import migration." }, 503);
      if (error.code === "P0001" && [
        "This event is not available for importing guests.",
        "Invalid guest import.",
        "Import between 1 and 500 guests at a time.",
        "Invalid guest row. Check names, guest types, and dietary notes.",
        "This import request was already used for a different file.",
        "The file contains duplicate guest names.",
        "A household name conflicts with an individual invitation.",
      ].includes(error.message)) return respond({ message: error.message }, 400);
      return respond({ message: "The import could not be confirmed. Retry the same import to check its result safely." }, 503);
    }
    const result = resultSchema.parse(data);
    if (result.issues.length) return respond({ ...result, message: "Resolve these conflicts and choose the file again. No guests were added." }, 409);
    if (parsed.data.mode === "import") revalidatePath(`/dashboard/events/${eventId}`);
    return respond({ ...result, status: "success" });
  } catch {
    return respond({ message: "The import could not be confirmed. Retry the same import to check its result safely." }, 503);
  }
}
