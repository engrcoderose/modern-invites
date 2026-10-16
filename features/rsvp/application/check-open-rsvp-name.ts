import type { OpenRsvpNameInput, OpenRsvpNameResult } from "../domain/open-rsvp";
import type { RsvpEventAccessRepository } from "../domain/rsvp-event-access-repository";
import { resolveRsvpEventAccess } from "./resolve-rsvp-event-access.ts";

export interface OpenRsvpNameRepository {
  checkName(eventId: number, fullName: string): Promise<OpenRsvpNameResult>;
}

export async function checkOpenRsvpName(
  accessRepository: RsvpEventAccessRepository,
  repository: OpenRsvpNameRepository,
  input: OpenRsvpNameInput,
): Promise<OpenRsvpNameResult | { status: "denied" | "closed" }> {
  const access = await resolveRsvpEventAccess(accessRepository, { slug: input.slug, code: "" });
  if (access.status !== "authorized") return { status: access.status };
  if (access.event.accessMode !== "open") return { status: "denied" };
  return repository.checkName(access.event.eventId, input.fullName);
}
