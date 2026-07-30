import type {
  ClientEventOption,
  ClientEventRole,
} from "./client";

export interface CreateClientIdentityInput {
  displayName: string;
  email: string;
  accessCode: string;
}

export interface CreateClientProfileInput {
  userId: string;
  displayName: string;
  accessCodeLastFour: string;
}

export interface AssignClientEventInput {
  userId: string;
  eventId: number;
  role: ClientEventRole;
}

export interface ClientProvisioningRepository {
  listActiveEvents(): Promise<ClientEventOption[]>;
  createClientIdentity(
    input: CreateClientIdentityInput,
  ): Promise<string>;
  createClientProfile(input: CreateClientProfileInput): Promise<void>;
  assignClientToEvent(input: AssignClientEventInput): Promise<void>;
  deleteClientIdentity(userId: string): Promise<void>;
}
