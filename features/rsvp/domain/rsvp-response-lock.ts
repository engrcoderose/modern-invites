export function isRsvpResponseLocked(
  respondedAt: string | null | undefined,
) {
  return Boolean(respondedAt);
}
