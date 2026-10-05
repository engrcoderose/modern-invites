import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { emptySeatingPlan, planSchema, savedSeatingSchema } from "../domain/seating-plan";
import { SeatingError, type SeatingRepository } from "../domain/seating-repository";

export async function createSupabaseSeatingRepository(): Promise<SeatingRepository> {
  const db = await createSupabaseServerClient();
  return {
    async load(eventId) {
      const { data, error } = await db.from("event_seating_plans").select("document, revision, published_document").eq("event_id", eventId).maybeSingle();
      if (error) throw new Error("Unable to load the seating plan.");
      return data ? { plan: planSchema.parse(data.document), revision: data.revision, published: data.published_document !== null } : { plan: emptySeatingPlan(), revision: 0, published: false };
    },
    async save(eventId, input) {
      const { data, error } = await db.rpc("save_event_seating_plan", {
        p_event_id: eventId, p_revision: input.revision, p_document: input.plan, p_publish: input.publish,
      });
      if (error) {
        if (error.code === "40001") throw new SeatingError("conflict");
        if (error.code === "42501") throw new SeatingError("forbidden");
        if (error.code === "22023") throw new SeatingError("invalid");
        throw new Error("Unable to save the seating plan.");
      }
      return savedSeatingSchema.parse(data);
    },
  };
}
