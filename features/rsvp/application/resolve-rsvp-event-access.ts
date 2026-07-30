import type { RsvpEventAccessResult } from "../domain/rsvp-event-access";
import type { RsvpEventAccessRepository } from "../domain/rsvp-event-access-repository";

export interface ResolveRsvpEventAccessCommand {
  slug: string;
  code: string;
}

function isClosed(
  event: {
    isActive: boolean;
    rsvpDeadline: string | null;
  },
) {
  const deadlineTime = event.rsvpDeadline
    ? Date.parse(event.rsvpDeadline)
    : Number.NaN;

  return (
    !event.isActive ||
    (Number.isFinite(deadlineTime) && deadlineTime < Date.now())
  );
}

export async function resolveRsvpEventAccess(
  repository: RsvpEventAccessRepository,
  command: ResolveRsvpEventAccessCommand,
): Promise<RsvpEventAccessResult> {
  const configuredEvent = await repository.findBySlug(command.slug);

  if (!configuredEvent) {
    return { status: "denied" };
  }

  if (configuredEvent.accessMode === "name_search") {
    return isClosed(configuredEvent)
      ? { status: "closed" }
      : {
          status: "authorized",
          event: configuredEvent,
        };
  }

  if (!command.code) {
    return { status: "denied" };
  }

  const verifiedEvent = await repository.verifySharedCode(
    command.slug,
    command.code,
  );

  if (!verifiedEvent) {
    return { status: "denied" };
  }

  return isClosed(verifiedEvent)
    ? { status: "closed" }
    : {
        status: "authorized",
        event: verifiedEvent,
      };
}
