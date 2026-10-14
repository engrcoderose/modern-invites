# Open RSVP

Open RSVP is an optional access mode for any event. Visitors reply for themselves
without a shared code, invitation selection, or a preloaded guest list. A full
name and attendance choice are required; email, phone, dietary needs, and a message
are optional. Each saved reply creates a one-person invitation, guest, and RSVP
using the existing dashboard and export tables. Existing replies are preserved.

## Manual database setup

Run `supabase/migrations/20261014_open_rsvp.sql` in your Supabase SQL editor after
the existing RSVP access/response migrations. This updates the allowed event
access modes and adds a private receipt table and a service-role-only transactional
submission function. It does not enable open access on any existing event.
Shared-code hashes are retained when changing modes.

No production credentials or Supabase connections were used during implementation.
The migration was tested with synthetic records in an isolated local PostgreSQL
engine. Apply and verify it yourself before enabling the feature.

After applying the migration, go to **Admin → Events → the event → RSVP access**,
choose **Open RSVP — anyone can reply**, and save. Keep the event active and clear
the RSVP deadline if replies should remain open indefinitely. Event status,
RSVP service availability, validation, and ordinary request rate limits still apply.
For listed guests, the existing household/individual reply setting and completed-response locks still apply. Unlisted visitors reply for themselves.

Open RSVP is displayed inside the website invitation's existing RSVP section.
Share the invitation website, not a separate RSVP page.

Existing shared-code forms retain their original code-first flow. To embed open
RSVP in an invitation, explicitly select the new mode:

```tsx
<SmartRsvpFlow eventSlug="your-event-slug" accessMode="open" theme={weddingSmartRsvpTheme} />
```

The existing custom hook-based RSVP flows use the shared form only when their
event enables open access. No existing invitation
was switched to open access. No admin event record was created.

## Preview

Visit `/rsvp-sample/open` to try the reusable form. The preview never calls the
RSVP API or saves responses. Refresh to start again.

## Manual verification

```sql
select slug, is_active, rsvp_access_mode, rsvp_deadline
from public.events where slug = 'your-event-slug';

select has_function_privilege('service_role',
  'public.submit_open_rsvp(bigint,uuid,text,text,text,text,text,text)', 'EXECUTE') as service_can_submit,
  has_function_privilege('anon',
  'public.submit_open_rsvp(bigint,uuid,text,text,text,text,text,text)', 'EXECUTE') as anon_can_submit;
-- Expected: true, false.

select g.full_name, g.attendance_status, g.responded_at, r.submitted_at
from public.guests g
join public.invitations i on i.id = g.invitation_id
join public.events e on e.id = i.event_id
join public.rsvps r on r.invitation_id = i.id
where e.slug = 'your-event-slug'
order by r.submitted_at desc limit 10;
```

Test both attendance choices, optional fields, required-field validation, retries
after a network failure, and the dashboard/export. Restricted events must reject
requests to `/api/rsvp/open`; open events also support guest-list search and verified household replies using the existing response rules. Guests cannot use open access to edit somebody
else's response. A same-payload retry with the same request UUID returns the
original result; a changed payload cannot reuse that UUID. Names already present in the same event are directed to household lookup. Matching ignores capitalization and repeated spaces. Existing records are never automatically merged or overwritten.

## Duplicate prevention update

If the original migration is already installed, run supabase/migrations/20261015_open_rsvp_duplicate_guard.sql and deploy the application update. This replaces only the open submission function; existing duplicates are left untouched for manual review.
