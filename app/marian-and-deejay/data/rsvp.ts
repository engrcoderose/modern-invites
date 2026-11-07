import type { RsvpFieldOptions } from "@/components/smart-rsvp/types";
import photo from "../assets/images/Prenup/optimized/nhut6748.webp";

export const rsvpEventSlug = "marian-and-deejay";

export const rsvpFields: RsvpFieldOptions = { email: true, dietaryRestrictions: true, message: true };
export const rsvpPhoto = {
  src: photo,
  alt: "Marian and Dee Jay celebrating together with her bouquet on the beach",
  position: "50% 24%",
};
