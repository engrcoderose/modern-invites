import { z } from "zod";

export const openRsvpSchema = z.object({
  slug: z.string().trim().toLowerCase().min(1).max(100),
  requestId: z.uuid(),
  fullName: z.string().trim().transform(value => value.replace(/\s+/g, " ")).pipe(z.string().min(2, "Enter your full name.").max(150)),
  attendance: z.enum(["attending", "declined"], { error: "Choose whether you will attend." }),
  email: z.string().trim().max(254).pipe(z.union([z.literal(""), z.email({ error: "Enter a valid email address." })])).default(""),
  phone: z.string().trim().max(40).default(""),
  dietaryRestrictions: z.string().trim().max(500).default(""),
  message: z.string().trim().max(2000).default(""),
});

export type OpenRsvpInput = z.infer<typeof openRsvpSchema>;

export interface OpenRsvpSummary {
  totalGuests: number;
  attendingCount: number;
  declinedCount: number;
  maxAttendees: number;
}
