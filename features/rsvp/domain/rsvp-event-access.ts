export type RsvpAccessMode = "shared_code" | "name_search";

export interface RsvpEventAccessConfiguration {
  eventId: number;
  eventName: string;
  slug: string;
  rsvpDeadline: string | null;
  isActive: boolean;
  accessMode: RsvpAccessMode;
}

export type RsvpEventAccessResult =
  | {
      status: "authorized";
      event: RsvpEventAccessConfiguration;
    }
  | {
      status: "denied";
    }
  | {
      status: "closed";
    };
