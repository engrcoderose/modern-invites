# Olive & Theo — portfolio RSVP sample

Route: `/olive-and-theo`. All people, dates, addresses, and venue information are fictional. The reference supplied by the user informs the purpose only; the design, content, and composition are original.

## Structure

- `data/event.ts`: central event copy, ceremony timestamp, RSVP capacity/limit.
- `components/`: opening/orchestration, RSVP fields, and capacity details.
- `sections/`: hero, event details, countdown, and RSVP flow.
- `utilities/reply.ts`: typed validation and reply normalization.
- `styles/invitation.module.css`: scoped design tokens, typography, artwork, and motion.
- `assets/garden-table.jpg`: local photographic source; rendered through `next/image`.

## RSVP behavior and integration

The form asks only for full name, optional contact number, and accept/decline attendance. A single Send my RSVP action leads directly to confirmation; editing and reset remain available. Each accepted reply reserves one seat. It is deliberately in memory only. It does not submit a request, create an event record, contact Supabase, send email, or write browser storage. Refresh clears the reply. Visible disclaimer copy was removed at the user’s request. The seats counter represents the current in-memory confirmed response, not a live aggregate, and resets on refresh or a new reply.

When converting to a real invitation, replace the fictional content and follow the existing smart RSVP APIs and approved admin event configuration. A real successful submission must precede a persisted-response confirmation. Leave admin record creation to the user. Do not use this mock confirmation as a backend adapter.

The opening repeats on refresh, resets the scroll position, and ignores repeated activation. Its foreground exits over opaque olive; the backing then fades into the invitation. Main content stays inert until handoff, and keyboard focus moves to navigation. Reduced motion enters immediately, including when the preference changes mid-animation. No autoplay, audio, or slideshow is included.

The calendar download explicitly describes a fictional event, using UTC times corresponding to 3:30–10:00 PM in the Philippines. No directions link is provided for the fictional venue.

## Asset provenance

The table photograph is a stock scene, not a photograph of the fictional couple or venue. Source: `https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=85`, retrieved November 9, 2026. The downloaded image was visually inspected. No artwork from the user’s reference is reused. Font variables reuse Instrument Serif and Inter from the existing root font configuration.

## Verification boundaries

Use an isolated frontend preview without real environment files or Supabase imports. Root Next commands automatically load private environment files and must not be used here. The isolated preview copies only this invitation and uses installed dependencies and locally cached font assets.

Verified November 9, 2026:

- Full repository TypeScript check; scoped ESLint; three synthetic reply validation/normalization tests.
- Production build of the isolated invitation, with development and production output kept separate.
- Browser layouts at 390, 768, 1280, and 1440 pixels; no horizontal overflow observed. Final full-page captures are at 390 and 1280; the 1440 layout was reviewed before the interaction corrections.
- Required name/attendance validation, blank optional contact, local/international contact validation, direct confirmation, editing, declining, and reset.
- Opening foreground/opaque-backing sequence, completed handoff, focus following mobile RSVP steps, loaded images, responsive image selection, and no browser console warnings/errors in the final tab.
- Scoped DESIGN.md and design.json document the shipped world; stock-image provenance is embedded in the JPEG.

Reduced-motion branches were source-reviewed; emulated reduced motion and iOS Safari were not exercised. No real RSVP persistence or backend integration was tested or added.

## Requested simplification

The itinerary, quote interlude, attire/FAQ guide, and their obsolete data/styles were removed. Core event details show the names, date/time, and venue. A four-unit live countdown uses the explicit Philippine timezone timestamp, avoids hydration mismatch, and clamps at zero. RSVP capacity is 100, maximum per response is one, deadline March 1, 2027. Visible sample badges, disclaimer paragraphs, and disclaimer footer copy are removed. Backend behavior remains in memory only.

The latest form simplification removes email, meals, dietary fields, personal notes, guest-count selection, and the intermediate review step. Contact numbers stay in component memory like all other reply data.
