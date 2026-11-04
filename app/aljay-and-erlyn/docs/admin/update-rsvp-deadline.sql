-- Manual update only; this script has not been executed against Supabase.
-- Alternatively, set this event's RSVP Deadline to 2026-11-10 in admin settings.
-- Run the complete script. It updates only the confirmed event's deadline
-- and modification timestamp, and aborts unless exactly one event matches.
BEGIN;

DO $$
DECLARE
  affected_events integer;
BEGIN
  UPDATE public.events
  SET rsvp_deadline = DATE '2026-11-10',
      updated_at = now()
  WHERE slug = 'aljay-and-erlyn';

  GET DIAGNOSTICS affected_events = ROW_COUNT;
  IF affected_events <> 1 THEN
    RAISE EXCEPTION 'Expected one aljay-and-erlyn event; found %.', affected_events;
  END IF;
END;
$$;

COMMIT;

-- Verification: expect one row with deadline_matches = true.
SELECT slug, rsvp_deadline,
       rsvp_deadline = DATE '2026-11-10' AS deadline_matches
FROM public.events
WHERE slug = 'aljay-and-erlyn';
