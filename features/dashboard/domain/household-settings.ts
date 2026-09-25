import { z } from "zod";

export const householdSettingsSchema = z.object({
  eventId: z.coerce.number().int().positive(),
  householdId: z.coerce.number().int().positive(),
  householdName: z.string().trim()
    .min(1, "Enter the household name.")
    .max(120, "The household name is too long."),
  maximumGuests: z.coerce.number()
    .int("Maximum guests must be a whole number.")
    .min(1, "Maximum guests must be at least 1.")
    .max(1000, "Maximum guests cannot exceed 1,000."),
});

export function householdCapacityError(maximumGuests: number, guestCount: number) {
  return maximumGuests < guestCount
    ? `Maximum guests cannot be below the ${guestCount} guests already in this household. Remove guests first to lower the limit.`
    : null;
}
