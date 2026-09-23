import type { DemoHousehold } from "./demo-rsvp";

// Fictional sample households only. Never add real guest records to this file.
export const demoHouseholds: DemoHousehold[] = [
  {
    id: "del-rosario-aguilar", name: "Clara del Rosario & Enzo Aguilar", maxAttendees: 2,
    guests: [{ id: "clara", name: "Clara del Rosario", type: "Adult" }, { id: "enzo", name: "Enzo Aguilar", type: "Adult" }],
  },
  {
    id: "navarro", name: "Lucia Navarro", maxAttendees: 1,
    guests: [{ id: "lucia", name: "Lucia Navarro", type: "Adult" }],
  },
  {
    id: "alvarado", name: "The Alvarado Family", maxAttendees: 3,
    guests: [{ id: "tomas", name: "Tomas Alvarado", type: "Adult" }, { id: "ines", name: "Ines Alvarado", type: "Adult" }, { id: "leo", name: "Leo Alvarado", type: "Child" }],
  },
];
