# Standalone RSVP sample

Open `/rsvp-sample`. The page is presented as a finished client invitation, with a small centered sample data note beneath the name search, styled like Joshua and Bea’s RSVP note. It highlights one searchable name per household, reserved places, and temporary reply behavior. Event details and the temporary guest list live in `data/sample-event.ts`.

- Try **Isabel Santos** for a three-person household or **Daniel Reyes** for a solo invitation. Other listed household members also work. Complete-name matching ignores case and extra spaces.
- Choose attendance for every guest, optionally add dietary notes and a message, then confirm the RSVP.
- The confirmation shows every answer and supports editing or finding another invitation.
- All input remains in React memory and clears on refresh. There are no API requests, server actions, database clients, cookies, or browser storage in this sample.
- Existing RSVP types and the pure household attendance summary are reused. The live RSVP flow and its API are intentionally not imported.
- This page is excluded from search indexing through route metadata.
- Database integration is still pending. The client-facing wording does not change the in-memory behavior; this page must be connected to persistence before collecting real guest replies.
