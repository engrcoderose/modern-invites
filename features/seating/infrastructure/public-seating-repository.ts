import "server-only";
import { isMissingSeatingFunction } from "@/features/services/infrastructure/service-schema-compatibility";
import { cache } from "react";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { planSchema } from "../domain/seating-plan";

const publishedLayoutSchema = z.object({ name: z.string().min(1).max(150), plan: planSchema }).strict();
const seatLookupSchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("found"), tableId: z.string().uuid(), seatNumber: z.number().int().min(1).max(30).optional() }).strict(),
  z.object({ status: z.enum(["not_found", "ambiguous"]) }).strict(),
]);

export const getPublishedSeating = cache(async (slug: string) => {
  const db = createSupabaseAdminClient();
  const { data, error } = await db.rpc("get_published_seating_layout", { p_slug: slug });
  if (isMissingSeatingFunction(error, "get_published_seating_layout")) return null;
  if (error) throw new Error("Unable to load the guest floor plan.");
  if (!data) return null;
  return publishedLayoutSchema.parse(data);
});

export async function findPublishedSeat(slug: string, name: string): Promise<
  { status: "found"; tableId: string; seatNumber?: number } | { status: "not_found" | "ambiguous" }
> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db.rpc("find_published_seat", { p_slug: slug, p_name: name });
  if (error) throw new Error("Unable to find a table.");
  return seatLookupSchema.parse(data);
}
