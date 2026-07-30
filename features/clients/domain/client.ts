export type ClientEventRole = "owner" | "editor" | "viewer";

export interface ClientEventOption {
  id: number;
  name: string;
  slug: string;
}

export interface CreateClientAccessCommand {
  displayName: string;
  email: string;
  eventId: number;
  role: ClientEventRole;
}

export interface ProvisionedClientAccess {
  userId: string;
  displayName: string;
  email: string;
  eventId: number;
  role: ClientEventRole;
  accessCode: string;
}

export class ClientProvisioningError extends Error {
  constructor(
    public readonly code:
      | "email_already_registered"
      | "event_not_found"
      | "unexpected",
    message: string,
  ) {
    super(message);
    this.name = "ClientProvisioningError";
  }
}
