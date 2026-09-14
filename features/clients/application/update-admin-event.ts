import { z } from "zod";
import type { EventSettingsInput, EventSettingsState, EventUpdateResult } from "../domain/event-management";

const schema = z.object({
  id: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER),
  version: z.string().datetime({ offset: true }),
  name: z.string().trim().min(2, "Enter the event name.").max(150, "Use at most 150 characters."),
  rsvpDeadline: z.string().refine(value => {
    if (!value) return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, "Enter a valid RSVP deadline."),
  responseMode: z.enum(["household", "individual"], { error: "Choose a reply mode." }),
  status: z.enum(["active", "archived"], { error: "Choose an event status." }),
});

export async function updateAdminEvent(dependencies: {
  isAdministrator(): Promise<boolean>;
  updateEvent(input: EventSettingsInput): Promise<EventUpdateResult>;
}, formData: FormData): Promise<EventSettingsState> {
  try {
    if (!await dependencies.isAdministrator()) return { status: "error", message: "Your administrator session has expired. Sign in again." };
    const parsed = schema.safeParse(Object.fromEntries(
      ["id", "version", "name", "rsvpDeadline", "responseMode", "status"].map(key => [key, formData.get(key)]),
    ));
    if (!parsed.success) return { status: "error", message: "Review the fields and try again.", fieldErrors: parsed.error.flatten().fieldErrors };
    const { status, rsvpDeadline, ...values } = parsed.data;
    const result = await dependencies.updateEvent({ ...values, rsvpDeadline: rsvpDeadline || null, isActive: status === "active" });
    if (result.status === "conflict") return { status: "error", message: "This event changed since you opened it or is no longer available. Reload the page to review the latest details before saving." };
    return { status: "success", message: "Event settings saved.", updatedEvent: result.event };
  } catch {
    return { status: "error", message: "Unable to save event settings. Your changes have been kept in the form. Please try again." };
  }
}
