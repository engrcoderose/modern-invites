import type { OpenRsvpInput, OpenRsvpSummary } from "../domain/open-rsvp";
import type { RsvpEventAccessRepository } from "../domain/rsvp-event-access-repository";
import { resolveRsvpEventAccess } from "./resolve-rsvp-event-access.ts";

export interface OpenRsvpRepository {
  submit(eventId: number, input: OpenRsvpInput): Promise<OpenRsvpSummary>;
}

export async function submitOpenRsvp(
  accessRepository: RsvpEventAccessRepository,
  repository: OpenRsvpRepository,
  input: OpenRsvpInput,
): Promise<{ status: "saved"; summary: OpenRsvpSummary } | { status: "denied" } | { status: "closed" }> {
  const access = await resolveRsvpEventAccess(accessRepository, { slug: input.slug, code: "" });
  if (access.status !== "authorized") return { status: access.status };
  if (access.event.accessMode !== "open") return { status: "denied" };
  return { status: "saved", summary: await repository.submit(access.event.eventId, input) };
}
