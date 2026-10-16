# Open RSVP

Open RSVP lets anyone reply for themselves without a code, household lookup, or
invitation selection. Guests enter their full name first. The server checks that
name before the answer form appears:

- No previous response: continue directly to attendance and optional details.
- Already responded: show **RSVP already submitted** and block another reply.
- Several unanswered guests share the exact name: ask the guest to contact the
  couple rather than select a household or change an arbitrary person's record.

Matching ignores capitalization, leading/trailing whitespace, and repeated
whitespace. A guest counts as responded when `responded_at` is present or their
attendance is no longer `pending`, including older records without a timestamp.
Submission rechecks under a database lock, so the preflight is not the only
duplicate guard. Request receipts still allow safe retries after a lost response.

## Manual database setup

Run these scripts yourself in the Supabase SQL editor. Do not run older function
replacements after the latest migration, because that would restore the old flow.

1. Keep the existing guest-contact/individual-response migrations installed,
   including `20260731_individual_name_search_rsvp.sql` and
   `20260731_lock_completed_individual_rsvp.sql`.
2. If Open RSVP has not been installed, apply
   `supabase/migrations/20261014_open_rsvp.sql` first. It adds the access mode and
   private retry receipts without enabling Open RSVP on any event.
3. Apply [20261016_open_rsvp_name_first.sql](../supabase/migrations/20261016_open_rsvp_name_first.sql).
   This adds the service-role-only name check and replaces the open submission
   function. It supersedes `20261015_open_rsvp_duplicate_guard.sql`; that older
   update is not required separately.
4. Deploy the matching application update. Confirm the existing event is active,
   includes the RSVP service, uses **Open RSVP — anyone can reply**, and has the
   intended deadline. No admin event record or settings were changed by this work.

The latest migration only defines functions when installed. It does not rewrite
existing guests, replies, event settings, or duplicate names. A later submission
reuses a single pending guest's record, preserving the existing capacity rules
and other guests' answers. For an unlisted name, it creates a one-person
invitation, guest, and RSVP in the existing dashboard/export tables. This internal
storage does not add a household step to the guest experience.

No production credentials or Supabase connections were used during implementation.
The migration was tested with synthetic records in a local PostgreSQL engine.

## Website integration

Open RSVP stays in the invitation's existing RSVP section:

```tsx
<SmartRsvpFlow eventSlug="your-event-slug" accessMode="open" theme={weddingSmartRsvpTheme} />
```

The shared component always starts open replies with the name check. The old
`defaultOpenPath` chooser has been removed. Existing shared-code and name-search
invitations retain their access and response rules. An explicit
`allowUnlistedReplies={false}` still supports an intentionally list-only embed.
Optional field settings continue to apply to the answer form.

Visit `/rsvp-sample/open` for a frontend-only preview. Use any fictional name, or
**Alex Sample** to see an already submitted message. Successful sample names are
remembered only in that tab until refresh; no API or real database is used.

## Manual verification

Run these read-only checks yourself after installing the migration:

```sql
select slug, is_active, rsvp_access_mode, rsvp_deadline
from public.events where slug = 'your-event-slug';

select
  has_function_privilege('service_role',
    'public.check_open_rsvp_name(bigint,text)', 'EXECUTE') as service_can_check,
  has_function_privilege('anon',
    'public.check_open_rsvp_name(bigint,text)', 'EXECUTE') as anon_can_check,
  has_function_privilege('service_role',
    'public.submit_open_rsvp(bigint,uuid,text,text,text,text,text,text)', 'EXECUTE') as service_can_submit,
  has_function_privilege('anon',
    'public.submit_open_rsvp(bigint,uuid,text,text,text,text,text,text)', 'EXECUTE') as anon_can_submit;
-- Expected: true, false, true, false.

select public.check_open_rsvp_name(id, 'Authorized Test Guest')
from public.events where slug = 'your-event-slug';
-- Name check only; it creates no records.

select g.full_name, g.attendance_status, g.responded_at
from public.guests g
join public.invitations i on i.id = g.invitation_id
join public.events e on e.id = i.event_id
where e.slug = 'your-event-slug'
order by g.responded_at desc nulls last limit 10;
```

In the deployed invitation, test an authorized new name and a pending listed name.
Confirm questions appear only after the check and the reply appears in the
dashboard/export. Try the same name again with changed capitalization and extra
spaces: the answer form must stay hidden. Check attending and declined replies,
optional fields, a lost-response retry, and two tabs opened before submission.
The second distinct submission must be rejected; an unchanged retry using the
original request UUID returns the original result. Restricted, closed, expired,
and non-RSVP events must reject both open endpoints. A failed name check must keep
the answer form hidden and allow retry.
