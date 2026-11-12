# Guest table message visibility

RSVP message persistence is independent of the dashboard table's presentation.
The shared RSVP hooks submit `message`, and the RSVP API forwards it to the
existing save functions. The dashboard repository maps each guest's message,
falling back to the household RSVP message for household response mode. The
RSVP workbook export always includes its Message column.

`GuestTable` shows the message column by default. Set `showMessages={false}` in
frontend code to hide its header and cells; this does not alter message data,
API requests, storage, or exports. `messageColumnLabel` defaults to `Message`.
The event dashboard uses `Song request` for Leslie & Serj and `Message` for
other invitations, including Christina & Reboden.

Hidden columns reduce the table's minimum width; visible message cells preserve
line breaks, wrap long text, and display `None` for empty or whitespace-only
messages. Frontend visibility is presentation, not a data-access boundary;
existing authenticated dashboard permissions remain responsible for access.

Verification uses synthetic local data only. No live guest records, credentials,
or Supabase queries are needed to check show/hide behavior.
