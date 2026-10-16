export class OpenRsvpNameExistsError extends Error {
  constructor() {
    super("This name is already recorded. Please contact the couple for help submitting your RSVP.");
  }
}

export class OpenRsvpAlreadyRespondedError extends Error {
  constructor() { super("An RSVP has already been submitted for this name. Please contact the couple if you need to make a change."); }
}

export class OpenRsvpNameAmbiguousError extends Error {
  constructor() { super("More than one guest shares this name. Please contact the couple so we can confirm the correct person."); }
}
