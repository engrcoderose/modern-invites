import type { ClientEventOption } from "./client";
import type { ClientServices } from "../../services/domain/client-services";

export interface CreateEventInput {
  name: string;
  slug: string;
  rsvpDeadline: string | null;
  responseMode: "household" | "individual";
  clientServices: ClientServices;
}

export type CreateEventResult =
  | { status: "created"; event: ClientEventOption }
  | { status: "duplicate_slug" };

export interface EventCreationRepository {
  createEvent(input: CreateEventInput): Promise<CreateEventResult>;
}

export interface CreateEventFormState {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Partial<Record<keyof CreateEventInput, string[]>>;
  createdEvent?: ClientEventOption;
}

export type CreateEventAction = (
  previousState: CreateEventFormState,
  formData: FormData,
) => Promise<CreateEventFormState>;
