# Closed RSVP notices

The RSVP APIs return `code: "RSVP_CLOSED"` only when the event is closed. The
frontend checks that code rather than treating every forbidden response as a
closure. Temporary failures keep their existing error and retry behavior.

`SmartRsvpFlow` replaces the form with `RsvpClosedNotice` when closure is reported
during access, guest search, invitation loading, name verification, or submission.
The closed notice has no retry button and directs guests to contact the host.

Use `closedMessage` for event-appropriate wording. Weddings can reuse
`coupleRsvpClosedMessage`; other celebrations can supply their own message or use
the host-neutral default. `closedAppearance` and `closedTitleClassName` override
the presentation when needed. Otherwise, the notice inherits the flow's search
or open-form appearance and search heading classes, along with its theme colors.
The acronym “RSVP” uses upright Libre Baskerville for legibility; “Closed” keeps
the invitation's heading font.

Custom invitation flows can render `RsvpClosedNotice` inside their existing
panels. Handle both `useSmartRsvp().rsvpClosed` and
`usePartyResponse().rsvpClosed` so closure during submission also replaces the
form. Pass the same presentation options to an `OpenRsvpFlow` fallback.

This presentation does not enable RSVPs or change event settings. Demo forms and
invitations awaiting configuration retain their existing behavior.
