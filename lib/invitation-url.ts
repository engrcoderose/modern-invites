// RSVP event identifiers stay stable when invitations move to a public domain.
const publicInvitationUrls = new Map<string, string>([
  ["jaydee-and-bea", "https://jaydeeandbeawedding.moderninvites.com/"],
  ["edcel-and-apreal", "https://edcelandaprealwedding.moderninvites.com/"],
  ["ryan-and-anne", "https://ryanandannewedding.moderninvites.com/"],
  ["mario-and-inah", "https://marioandinahwedding.moderninvites.com/"],
  ["anjo-and-jasmin", "https://anjoandjasminwedding.moderninvites.com/"],
  ["jasmin-and-anjo-wedding", "https://anjoandjasminwedding.moderninvites.com/"],
  ["leslie-and-serj", "https://leslieandserjwedding.moderninvites.com/"],
  ["aljay-and-erlyn", "https://aljayanderlynwedding.moderninvites.com/"],
]);

export function getInvitationUrl(eventSlug: string): string {
  return publicInvitationUrls.get(eventSlug) ?? `/${eventSlug}`;
}
