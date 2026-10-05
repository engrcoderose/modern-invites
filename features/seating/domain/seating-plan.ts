import { z } from "zod";
import { VENUE_KINDS } from "./venue-objects.ts";

export const TABLE_SHAPES = ["round", "square", "long", "oval"] as const;
const id = z.string().uuid();
const position = z.number().finite().min(8).max(92);
export const tableSchema = z.object({
  id, name: z.string().trim().min(1).max(60),
  shape: z.enum(TABLE_SHAPES), capacity: z.number().int().min(1).max(30),
  x: position, y: position, rotation: z.number().finite().min(0).max(359),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  // Omitted on older plans; the renderer retains their original dimensions.
  width: z.number().finite().min(60).max(240).optional(),
  height: z.number().finite().min(40).max(200).optional(),
}).strict();
export const landmarkSchema = z.object({
  id, name: z.string().trim().min(1).max(60),
  kind: z.enum(VENUE_KINDS),
  x: position, y: position,
  // Optional for compatibility with saved layouts created before venue sizing.
  width: z.number().finite().min(20).max(180).optional(),
  height: z.number().finite().min(8).max(100).optional(),
  rotation: z.number().finite().min(0).max(359).optional(),
}).strict();
export const planSchema = z.object({
  version: z.literal(1),
  tables: z.array(tableSchema).max(100),
  landmarks: z.array(landmarkSchema).max(20),
  assignments: z.array(z.object({ guestId: z.number().int().positive().max(Number.MAX_SAFE_INTEGER), tableId: id,
    // Older plans may assign a table without reserving an individual chair.
    seatNumber: z.number().int().min(1).max(30).optional(),
  }).strict()).max(3000),
}).strict().superRefine((plan, context) => {
  const tableIds = new Set(plan.tables.map(table => table.id));
  const allIds = [...plan.tables, ...plan.landmarks].map(item => item.id);
  const guestIds = plan.assignments.map(assignment => assignment.guestId);
  if (new Set(allIds).size !== allIds.length) context.addIssue({ code: "custom", message: "Each table and venue object needs a unique ID." });
  if (new Set(guestIds).size !== guestIds.length) context.addIssue({ code: "custom", message: "A guest can only be assigned once." });
  if (plan.assignments.some(assignment => !tableIds.has(assignment.tableId))) context.addIssue({ code: "custom", message: "An assignment references a missing table." });
  const seats = new Set<string>();
  for (const assignment of plan.assignments) {
    if (assignment.seatNumber === undefined) continue;
    const capacity = plan.tables.find(table => table.id === assignment.tableId)?.capacity ?? 0;
    if (assignment.seatNumber > capacity) context.addIssue({ code: "custom", message: "An assigned seat exceeds its table's capacity. Reassign that seat before saving." });
    const key = `${assignment.tableId}:${assignment.seatNumber}`;
    if (seats.has(key)) context.addIssue({ code: "custom", message: "Two guests cannot occupy the same seat at a table." });
    seats.add(key);
  }
  if (plan.tables.some(table => plan.assignments.filter(assignment => assignment.tableId === table.id).length > table.capacity)) {
    context.addIssue({ code: "custom", message: "A table exceeds its capacity. Move guests or increase its seats before saving." });
  }
});

export type SeatingTable = z.infer<typeof tableSchema>;
export type SeatingLandmark = z.infer<typeof landmarkSchema>;
export type SeatingPlan = z.infer<typeof planSchema>;
export interface SeatingGuest {
  id: number;
  fullName: string;
  householdName: string;
  attendanceStatus: "pending" | "attending" | "declined";
}
export const savedSeatingSchema = z.object({
  plan: planSchema,
  revision: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER),
  published: z.boolean(),
}).strict();
export type SavedSeatingPlan = z.infer<typeof savedSeatingSchema>;
export const saveSeatingSchema = z.object({
  plan: planSchema,
  revision: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER),
  publish: z.boolean().nullable(),
}).strict();
export type SaveSeatingInput = z.infer<typeof saveSeatingSchema>;
export function emptySeatingPlan(): SeatingPlan {
  return { version: 1, tables: [], landmarks: [], assignments: [] };
}

export function validateSeatingGuests(plan: SeatingPlan, guests: SeatingGuest[]) {
  const byId = new Map(guests.map(guest => [guest.id, guest]));
  for (const assignment of plan.assignments) {
    const guest = byId.get(assignment.guestId);
    if (!guest) return "A seated guest is no longer in this event. Reload the guest list before saving.";
    if (guest.attendanceStatus === "declined") return "A seated guest has declined. Unassign them before saving.";
  }
  return null;
}
