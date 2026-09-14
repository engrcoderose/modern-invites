# Create an event and client access

Sign in as a platform administrator and open **Admin → Clients** (`/admin/clients`).

1. Under **Create an event**, enter the celebration name and event identifier. For Anjo and Jasmin, use `anjo-and-jasmin` to match the invitation's RSVP configuration.
2. Optionally set an RSVP deadline. Choose whether guests can reply for their household or only themselves.
3. Click **Create event**. The new event is automatically selected in **Create client access** below.
4. Enter the client's name and email, choose their permission, and click **Generate client access**.
5. Copy the generated access code and give it to the client through your usual private channel. They can sign in at `/client-login` and manage the event's guest list and RSVPs.

If the event already exists, skip event creation and select it in the client access form. Duplicate identifiers are rejected without overwriting an existing event.

New events are active and use invited-name search for RSVP access. They do not require a shared RSVP code. No per-event SQL or manual Supabase record creation is needed.

Creating an event sets up its RSVP data; it does not generate a designed invitation page. The invitation's RSVP form must be connected to the same event identifier, and its invited guests must be added before guests can respond.

## Review and edit existing events

Open **Admin → Events** (`/admin/events`) to browse all saved events, including archived events. Search by event name and filter by Active or Archived. Each event shows its assigned clients and RSVP deadline.

Choose **View & edit event** to change the event name, optional RSVP deadline, reply mode, or active/archived status. Click **Save changes** to apply the changes or **Discard changes** to return to the last saved values. Changes made in another admin tab are detected when saving; reload to review those changes first.

Archiving closes RSVP access and removes the event from the client's active dashboard. It preserves guests, replies, and assignments. Set the event back to **Active** to restore access, subject to its RSVP deadline. An elapsed RSVP deadline does not automatically archive an event.

The event identifier and RSVP access method remain fixed. These settings do not edit the invitation's designed content, such as its displayed names, date, venues, or story.
