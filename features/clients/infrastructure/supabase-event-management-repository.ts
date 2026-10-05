import "server-only";
import { readWithServiceCompatibility, serviceColumnsForWrite } from "@/features/services/infrastructure/service-schema-compatibility";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ManagedEvent, EventSettingsInput, EventUpdateResult } from "../domain/event-management";

const baseColumns = "id, name, slug, rsvp_deadline, rsvp_response_mode, rsvp_access_mode, is_active, updated_at";
const columns = `${baseColumns}, client_services`;
type EventRow = Omit<ManagedEvent, "clients">;

// Callers must verify platform administrator access before creating this repository.
export function createSupabaseEventManagementRepository() {
  const db = createSupabaseAdminClient();
  async function attachClients(events: EventRow[]): Promise<ManagedEvent[]> {
    if (!events.length) return [];
    const { data: memberships, error } = await db.from("event_members").select("event_id, user_id, role").in("event_id", events.map(event => event.id));
    if (error) throw new Error("Unable to load event clients.");
    const ids = [...new Set((memberships ?? []).map(member => member.user_id))];
    const profiles = ids.length ? await db.from("client_profiles").select("user_id, display_name, status").in("user_id", ids) : { data: [], error: null };
    if (profiles.error) throw new Error("Unable to load client details.");
    const byId = new Map((profiles.data ?? []).map(profile => [profile.user_id, profile]));
    return events.map(event => ({ ...event, clients: (memberships ?? []).filter(member => member.event_id === event.id).map(member => {
      const profile = byId.get(member.user_id);
      return { name: profile?.display_name ?? "Client profile unavailable", role: member.role, status: profile?.status ?? "unknown" };
    }) }));
  }
  return {
    async listEvents(search: string, status: string, page: number) {
      const { data, count, error, servicesAvailable } = await readWithServiceCompatibility(includeServices => {
        let query = db.from("events").select(includeServices ? columns : baseColumns, { count: "exact" });
        if (status === "active" || status === "archived") query = query.eq("is_active", status === "active");
        // Escape LIKE wildcards and filter one column, without interpolating PostgREST expressions.
        if (search) query = query.ilike("name", `%${search.replace(/[\\%_]/g, "\\$&")}%`);
        return query.order("created_at", { ascending: false }).order("id", { ascending: false }).range((page - 1) * 30, page * 30 - 1).returns<EventRow[]>();
      });
      if (error) throw new Error("Unable to load events.");
      return { events: await attachClients(((data ?? []) as EventRow[]).map(event => ({ ...event, servicesAvailable }))), total: count ?? 0 };
    },
    async getEvent(id: number): Promise<ManagedEvent | null> {
      const { data, error, servicesAvailable } = await readWithServiceCompatibility(includeServices => db.from("events").select(includeServices ? columns : baseColumns).eq("id", id).maybeSingle().returns<EventRow | null>());
      if (error) throw new Error("Unable to load event details.");
      return data ? (await attachClients([{ ...data as EventRow, servicesAvailable }]))[0] : null;
    },
    async updateEvent(input: EventSettingsInput): Promise<EventUpdateResult> {
      const serviceColumns = await serviceColumnsForWrite(input.clientServices, () => db.from("events").select("client_services").limit(0));
      const servicesAvailable = "client_services" in serviceColumns;
      const { data, error } = await db.from("events").update({
        name: input.name,
        rsvp_deadline: input.rsvpDeadline,
        rsvp_response_mode: input.responseMode,
        ...serviceColumns,
        is_active: input.isActive,
        updated_at: new Date().toISOString(),
      }).eq("id", input.id).eq("updated_at", input.version).select(servicesAvailable ? columns : baseColumns).maybeSingle().returns<EventRow | null>();
      if (error) throw new Error("Unable to save event settings.");
      if (!data) return { status: "conflict" };
      // The write has completed; do not turn an unrelated client lookup failure into a failed save.
      return { status: "updated", event: { ...data as EventRow, servicesAvailable, clients: [] } };
    },
  };
}
