export interface NameSearchMatch {
  invitation_id: number;
  household_name: string;
  matched_guest_name: string;
}

export interface NameSearchCandidate extends NameSearchMatch {
  event_id: number;
}

interface CandidateRepository {
  findCandidates(input: {
    eventId: number;
    pattern: string;
    offset: number;
    limit: number;
  }): Promise<NameSearchCandidate[]>;
}

export function nameWithoutMiddleInitials(value: string): string {
  const parts = value.trim().toLocaleLowerCase("en").split(/\s+/u);
  return parts.filter((part, index) =>
    index === 0 || index === parts.length - 1 || !/^\p{L}\.?$/u.test(part),
  ).join(" ");
}

// Only initial tokens between the first and last name are optional. Multi-word
// given names and surnames still have to match; this is not a fuzzy search.
export async function searchInvitationsWithoutMiddleInitials(
  repository: CandidateRepository,
  input: { eventId: number; fullName: string },
): Promise<NameSearchMatch[]> {
  const normalized = nameWithoutMiddleInitials(input.fullName);
  const parts = normalized.split(" ");
  if (parts.length < 2) return [];

  const pattern = `%${parts.map((part) => part.replace(/[\\%_]/g, "\\$&")).join("%")}%`;
  const limit = 200;
  const matches = new Map<string, NameSearchMatch>();
  for (let offset = 0; ; offset += limit) {
    const candidates = await repository.findCandidates({
      eventId: input.eventId, pattern, offset, limit,
    });
    for (const candidate of candidates) {
      if (candidate.event_id !== input.eventId ||
          nameWithoutMiddleInitials(candidate.matched_guest_name) !== normalized) continue;
      // Return the canonical invited name so party loading and submission keep
      // their existing exact-name and event/household authorization checks.
      const match = {
        invitation_id: candidate.invitation_id,
        household_name: candidate.household_name,
        matched_guest_name: candidate.matched_guest_name,
      };
      matches.set(`${match.invitation_id}:${match.matched_guest_name}`, match);
    }
    if (candidates.length < limit) break;
  }
  return [...matches.values()];
}
