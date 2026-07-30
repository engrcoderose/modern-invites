export type RsvpAccessMode = "shared_code" | "name_search";
export type RsvpResponseMode = "household" | "individual";

export interface RsvpEventAccessConfiguration {
  eventId: number;
  eventName: string;
  slug: string;
  rsvpDeadline: string | null;
  isActive: boolean;
  accessMode: RsvpAccessMode;
  responseMode: RsvpResponseMode;
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
