import type {
  ClientEventOption,
  ClientEventRole,
} from "../domain/client";

export interface CreatedClientAccessView {
  displayName: string;
  email: string;
  eventId: number;
  role: ClientEventRole;
  accessCode: string;
}

export interface CreateClientFormState {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: {
    displayName?: string[];
    email?: string[];
    eventId?: string[];
    role?: string[];
  };
  createdAccess?: CreatedClientAccessView;
}

export type CreateClientAction = (
  previousState: CreateClientFormState,
  formData: FormData,
) => Promise<CreateClientFormState>;

export interface CreateClientFormProps {
  action: CreateClientAction;
  events: ClientEventOption[];
}

export const initialCreateClientFormState: CreateClientFormState = {
  status: "idle",
};
