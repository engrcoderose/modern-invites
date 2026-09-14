import { z } from "zod";
import type { CreateEventFormState, EventCreationRepository } from "../domain/event-creation";

const eventSchema = z.object({
  name: z.string().trim().min(2, "Enter the event name.").max(150, "Use at most 150 characters."),
  slug: z.string().trim().toLowerCase().min(2, "Enter an event identifier.").max(100, "Use at most 100 characters.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens between words."),
  rsvpDeadline: z.string().refine(value => {
    if (!value) return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, "Enter a valid RSVP deadline."),
  responseMode: z.enum(["household", "individual"], { error: "Choose who each guest can reply for." }),
});

interface Dependencies {
  isAdministrator(): Promise<boolean>;
  createEvent: EventCreationRepository["createEvent"];
}

export async function createAdminEvent(
  dependencies: Dependencies,
  formData: FormData,
): Promise<CreateEventFormState> {
  try {
    // This check runs for every submission, before any privileged database access.
    if (!await dependencies.isAdministrator()) {
      return { status: "error", message: "Your administrator session has expired. Sign in again." };
    }

    const parsed = eventSchema.safeParse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      rsvpDeadline: formData.get("rsvpDeadline") ?? "",
      responseMode: formData.get("responseMode"),
    });
    if (!parsed.success) {
      return { status: "error", message: "Review the highlighted fields and try again.", fieldErrors: parsed.error.flatten().fieldErrors };
    }

    const result = await dependencies.createEvent({
      ...parsed.data,
      rsvpDeadline: parsed.data.rsvpDeadline || null,
    });
    if (result.status === "duplicate_slug") {
      return { status: "error", message: "An event already uses this identifier. Select that event below or enter a different identifier.", fieldErrors: { slug: ["This event identifier is already in use."] } };
    }
    return { status: "success", message: "Event created. You can now assign client access below.", createdEvent: result.event };
  } catch {
    return { status: "error", message: "The event could not be created. Please try again." };
  }
}
