export interface ManagedEvent {
  id: number;
  name: string;
  slug: string;
  rsvp_deadline: string | null;
  rsvp_response_mode: "household" | "individual";
  rsvp_access_mode: "name_search" | "shared_code";
  is_active: boolean;
  updated_at: string;
  clients: { name: string; role: string; status: string }[];
}

export interface EventSettingsInput {
  id: number;
  version: string;
  name: string;
  rsvpDeadline: string | null;
  responseMode: "household" | "individual";
  isActive: boolean;
}

export interface EventSettingsState {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  updatedEvent?: ManagedEvent;
}

export type UpdateEventSettingsAction = (previous: EventSettingsState, formData: FormData) => Promise<EventSettingsState>;
export type EventUpdateResult = { status: "updated"; event: ManagedEvent } | { status: "conflict" };
