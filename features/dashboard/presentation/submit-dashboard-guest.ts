import { createFetchWithTimeout } from "../../../lib/supabase/fetch-with-timeout.ts";
import type { GuestMutationState } from "./guest-mutation.types";

export type AddGuestResult = GuestMutationState;

export async function submitDashboardGuest(eventId: number, form: FormData, fetcher: typeof fetch = fetch, timeoutMs = 30_000): Promise<AddGuestResult> {
  try {
    const response = await createFetchWithTimeout(timeoutMs, fetcher)(`/api/dashboard/events/${eventId}/guests`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("Unexpected response.");
    const result = await response.json();
    if (response.ok && result.status === "success") return { status: "success", message: "Guest added successfully." };
    if (response.status < 500 && typeof result.message === "string") return { status: "error", message: result.message, needsRefresh: result.needsRefresh === true };
    throw new Error("Unable to confirm the result.");
  } catch {
    // A timeout does not prove a write failed. Require checking the refreshed
    // guest list before submitting again to avoid a duplicate guest.
    return { status: "error", needsRefresh: true, message: "We couldn't confirm whether the guest was added. Your entries are still here. Refresh the guest list and check for this name before trying again." };
  }
}
