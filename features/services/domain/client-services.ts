export const CLIENT_SERVICES = ["rsvp", "seat_finder", "rsvp_and_seat_finder"] as const;
export type ClientServices = (typeof CLIENT_SERVICES)[number];

export class ClientServicesSetupError extends Error {
  constructor() {
    super("Seat Finder database setup is pending. Run the Client Services and Seat Finder migration before selecting this service.");
    this.name = "ClientServicesSetupError";
  }
}

export const SERVICE_LABELS: Record<ClientServices, string> = {
  rsvp: "RSVP only",
  seat_finder: "Seat Finder only",
  rsvp_and_seat_finder: "RSVP and Seat Finder",
};

export function includesSeatFinder(services: ClientServices | undefined) {
  return services === "seat_finder" || services === "rsvp_and_seat_finder";
}

export function includesRsvp(services: ClientServices | undefined) {
  return services === undefined || services === "rsvp" || services === "rsvp_and_seat_finder";
}
