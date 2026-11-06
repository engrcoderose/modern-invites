import type { EventInformation, RsvpFieldOptions } from "@/components/smart-rsvp/types";
import wedding from "./wedding-details.json";
import photo from "../assets/images/Prenup/optimized/nhut6748.webp";

// Synthetic metadata for shared form validation only. No guest lookup or API call uses it.
export const rsvpPreviewEvent: EventInformation = {
  name: wedding.couple.display,
  slug: "preview-only",
  rsvpDeadline: wedding.rsvp.deadlineIso,
  accessMode: "name_search",
  responseMode: "individual",
};

export const rsvpFields: RsvpFieldOptions = { email: true, dietaryRestrictions: true, message: true };
export const rsvpPhoto = {
  src: photo,
  alt: "Marian and Dee Jay celebrating together with her bouquet on the beach",
  position: "50% 24%",
};
