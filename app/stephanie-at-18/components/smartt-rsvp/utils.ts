export function normalizeRsvpCode(value: string) {
  return value.trim().toUpperCase();
}

export function normalizeGuestName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}
