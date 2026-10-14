export class OpenRsvpNameExistsError extends Error {
  constructor() {
    super("This name is already on the guest list. Choose Find my household to view your invitation and RSVP status. If multiple guests share your name, contact the host.");
  }
}
