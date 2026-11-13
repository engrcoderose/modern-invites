# Importing an RSVP guest list

Owners and editors can use **Dashboard → Guest list and RSVPs → Import guests**.

1. Download the CSV template and replace its fictional example guests. Excel can open the CSV and save either CSV UTF-8 or `.xlsx`.
2. Add one guest per row. The first row contains the column headings below.
3. Choose the file and review the preview. Correct reported errors in the file and choose it again.
4. Click **Import guests** to save the whole batch. New guests start as **Pending**.

| Column | Meaning |
| --- | --- |
| Guest name | Required full name, up to 120 characters. |
| Household | Optional. Blank creates an individual invitation with one guest. Matching household names within the file group guests into one new invitation. Its maximum guest count equals its number of listed guests. |
| Guest type | Adult or Child; blank defaults to Adult. |
| Dietary notes | Optional, up to 500 characters. |

Limits: 500 guests and 2 MB per file. Excel uses the sheet named **Guest List**, or the first sheet if that name is absent. Use text values rather than formulas. The preview identifies ignored columns; RSVP status, contact details, messages, and other columns are never imported.

CSV imports support UTF-8 (with or without a BOM), legacy Windows-1252 Excel CSV, and BOM-marked UTF-16. Names such as **Joyce Zuñiga**, **José Niño**, and **Peña** retain their accents. Prefer **CSV UTF-8** or `.xlsx` when saving a guest list; other legacy encodings should be converted in the original spreadsheet first.

If a file already contains the replacement character **�**, the importer rejects it because the original letter has been lost. Correct those names in the source spreadsheet before uploading again. For names already imported incorrectly, use **Edit guest** to enter the correct spelling and save; imports never overwrite existing guests or RSVP responses.

Guests with identical names are allowed in different households, including when that name already exists in another household in the event. Assign distinct household names so guests can select the correct invitation when searching for their name. A blank Household creates a solo invitation named after the guest; two identical solo names still conflict. Duplicate names within the same household block the batch. Matches ignore case, extra whitespace, and Unicode composition differences. Existing household names also block the batch, including empty households. To add members to an existing household, use **Add guest**.

Existing guests, households, and RSVP responses are never updated by the import. The database rechecks conflicts at save time and writes each batch in one transaction. If saving times out, use **Retry this import safely**: the same request ID returns its recorded result without inserting the batch again. A later upload of the same names in the same households is rejected as a duplicate.

## Database setup

Apply `supabase/migrations/20260927_rsvp_guest_import.sql` before using the importer. It depends on the existing event, invitation, guest, client profile, and event membership tables. It is independent of the stashed Seat Finder migrations.

Then manually apply `supabase/migrations/20261114_household_scoped_guest_import.sql` to allow identical names in different households. For an existing installation, only this new migration is needed. It replaces `import_event_guests` with household-scoped duplicate checks, preserving authorization, existing-household protection, atomic writes, and retry receipts. It does not update guest, invitation, or RSVP records. Deploy the application validation change along with this migration; the old database function will continue rejecting repeated names across households until updated.

The migration adds an import-receipt table and two functions. It does not modify existing guest or RSVP records. Only active clients with owner/editor membership in an active event may preview or import; the transaction checks this independently of the UI. The receipt table stores counts and a payload hash, not guest names, and has no direct client access.

This repository change does not apply migrations to a connected database automatically. Until the migration is applied, preview displays a setup message and does not allow saving.

## Verification

`npm run test:dashboard` includes parser and validation tests plus an in-memory PostgreSQL test of the actual migration using PGlite. The database tests cover authorization, read-only preview, family capacities, preservation of existing replies, duplicate prevention, retry receipts, and rollback after a partial batch failure.

After applying the update, you can inspect the deployed function manually with this read-only query:

```sql
select pg_get_functiondef(
  'public.import_event_guests(bigint,uuid,jsonb,boolean)'::regprocedure
);
```

Verify that its duplicate grouping includes both the guest name and effective household name, and its existing-guest lookup checks `i.household_name` as well as `g.full_name`. In the dashboard, preview a file with the same guest name in two distinct new households: it should show two invitations without saving anything. Previewing that name twice in the same household should report a duplicate. Existing household names must still be reported as conflicts.
