// Fictional demo records only. Real guest details must stay on the server.
export const tables = [
  { number: 1, name: "Rose", location: "Front left, near the couple’s table" },
  { number: 2, name: "Peony", location: "Front right, near the couple’s table" },
  { number: 3, name: "Orchid", location: "Middle left, beside the dance floor" },
  { number: 4, name: "Lily", location: "Middle right, beside the dance floor" },
  { number: 5, name: "Jasmine", location: "Back left, near the entrance" },
  { number: 6, name: "Camellia", location: "Back right, near the entrance" },
] as const;

export const guests = [
  { id: "g01", name: "Olivia Bennett", table: 1, seat: 1 },
  { id: "g02", name: "Noah Bennett", table: 1, seat: 2 },
  { id: "g03", name: "Amelia Brooks", table: 2, seat: 1 },
  { id: "g04", name: "Lucas Brooks", table: 2, seat: 2 },
  { id: "g05", name: "Sofia Reyes", table: 3, seat: 1 },
  { id: "g06", name: "Mateo Reyes", table: 3, seat: 2 },
  { id: "g07", name: "Isabella Santos", table: 3, seat: 3 },
  { id: "g08", name: "Gabriel Santos", table: 3, seat: 4 },
  { id: "g09", name: "Emma Chen", table: 4, seat: 1 },
  { id: "g10", name: "Ethan Chen", table: 4, seat: 2 },
  { id: "g11", name: "Chloé Martin", table: 5, seat: 1 },
  { id: "g12", name: "Daniel Cruz", table: 5, seat: 2 },
  { id: "g13", name: "Mia Garcia", table: 6, seat: 1 },
  { id: "g14", name: "Leo Garcia", table: 6, seat: 2 },
  { id: "g15", name: "Alex Morgan", table: 5, seat: 3 },
  { id: "g16", name: "Alex Morgan", table: 6, seat: 3 },
] as const;

export function normalizeName(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}

export function findGuests(query: string) {
  const normalized = normalizeName(query);
  if (normalized.length < 2) return [];
  const terms = normalized.split(" ");
  return guests.filter((guest) => terms.every((term) => normalizeName(guest.name).includes(term)));
}
