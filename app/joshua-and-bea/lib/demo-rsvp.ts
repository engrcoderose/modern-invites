export type Attendance = "pending" | "attending" | "declined";
export type DemoGuest = { id: string; name: string; type: "Adult" | "Child" };
export type DemoHousehold = { id: string; name: string; maxAttendees: number; guests: DemoGuest[] };
export type GuestResponse = { status: Attendance; dietary: string };
export type HouseholdResponse = Record<string, GuestResponse>;

export function findHouseholds(households: DemoHousehold[], fullName: string) {
  const normalize = (value: string) => value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-PH");
  const query = normalize(fullName);
  if (query.length < 3) return [];
  return households.flatMap(household => {
    const guest = household.guests.find(member => normalize(member.name) === query);
    return guest ? [{ household, matchedName: guest.name }] : [];
  });
}

export function emptyResponse(household: DemoHousehold): HouseholdResponse {
  return Object.fromEntries(household.guests.map(guest => [guest.id, { status: "pending", dietary: "" }]));
}

export function summarizeResponse(household: DemoHousehold, responses: HouseholdResponse) {
  const values = household.guests.map(guest => responses[guest.id]?.status);
  const attending = values.filter(status => status === "attending").length;
  const declined = values.filter(status => status === "declined").length;
  return { attending, declined, pending: values.length - attending - declined, maximum: household.maxAttendees };
}

export function validateResponse(household: DemoHousehold, responses: HouseholdResponse) {
  const summary = summarizeResponse(household, responses);
  if (summary.pending) throw new Error("Please answer for every member of your household.");
  if (summary.attending > household.maxAttendees) throw new Error(`This invitation allows a maximum of ${household.maxAttendees} attendees.`);
  if (Object.keys(responses).some(id => !household.guests.some(guest => guest.id === id))) throw new Error("Please respond only for the guests listed on your invitation.");
  return summary;
}
