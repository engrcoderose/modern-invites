import type { EventInformation } from "@/components/smart-rsvp/types";
import { celebration } from "./event";

export const eventSlug = "ashley-at-18-rsvp";

// Presentation metadata for direct entry; the submission API still enforces
// the actual event's access mode, deadline, availability and duplicate rules.
export const rsvpEvent: EventInformation = {
  name: celebration.displayName,
  slug: eventSlug,
  accessMode: "open",
  responseMode: "individual",
  rsvpDeadline: null,
};
