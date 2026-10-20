// RSVP event identifiers stay stable when invitations move to a public domain.
const publicInvitationUrls = new Map<string, string>([
  ["mario-and-inah", "https://marioandinahwedding.moderninvites.com/"],
  ["anjo-and-jasmin", "https://anjoandjasminwedding.moderninvites.com/"],
  ["jasmin-and-anjo-wedding", "https://anjoandjasminwedding.moderninvites.com/"],
  ["leslie-and-serj", "https://leslieandserjwedding.moderninvites.com/"],
]);

export function getInvitationUrl(eventSlug: string): string {
  return publicInvitationUrls.get(eventSlug) ?? `/${eventSlug}`;
}
