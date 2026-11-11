# Ashley RSVP direction

Mode: Operate. The latest supplied reference sets a vintage floral-wallpaper hero with an ornate oval. Use pink roses, lavender frame/foliage, pearl-white trim and a blush center; the earlier satin/lace direction is superseded.

## Direction contract

THESIS: Exactly four ordered sections: HERO, COUNTDOWN, VENUE, OPEN RSVP. The white introduction belongs to HERO. No opening overlay or unrelated sections.

OWN-WORLD: Pink rose wallpaper, carved lavender/white oval with blush center and corner flowers, rose script, pink floral countdown, lavender venue, white direct-entry form. Keep name and date clear of decorative flowers at every width.

STORY: Ashley at 18, December 5, 2026, 3 PM arrival at Casa Dominguez; then one personal reply.

MOTION: Consistent 24px upward fades from opacity zero, 850ms ease-in-out, 120ms child stagger, once per viewport entry. Preserve normal layout and artwork transforms. Reduced motion skips effects; keyboard focus immediately reveals controls. No continuous loops.

ASSETS: Generated hero-floral-wallpaper.webp and transparent hero-ornate-frame.webp follow the latest reference. Countdown uses transparent landscape florals over pink. Prompts and provenance are adjacent to each asset.

## Integration boundary

OpenRsvpForm displays direct name entry and attendance in one step, using the owner-supplied slug ashley-at-18-rsvp with the established submission API. No separate name search/check, access initialization or preview callback remains. The server still enforces event availability, access mode, deadlines and duplicates on submission. The admin event must be active with Open RSVP enabled; live persistence has not been verified. Do not read private environment files or access Supabase.
