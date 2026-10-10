# Vincent and Gabrielle

Route: `/vincent-and-gabrielle`. This is an independent copy of the existing
olive-and-ivory invitation template, with its original screen order, typography,
page-fold geometry, opening transition, slideshow timing, swipe/keyboard
navigation, FAQ disclosures and reduced-motion behavior.

The couple's full names, complete entourage, and the assets in `assets/design`
and `assets/prenup` have been supplied and approved. The wedding is Saturday,
20 February 2027: ceremony at 2:00 PM at San Agustin Church, Intramuros, Manila;
reception at 5:00 PM at La Castellana, Cabildo St., Intramuros.
The invitation remains `noindex`; it is a review draft,
not ready to send to guests. No wedding date, venue, guest policy or entourage
name has been invented. The countdown targets the ceremony in Philippine time
(`2027-02-20T14:00:00+08:00`).

## Organization

- `data/wedding.ts`: names, date/time (including timezone), venues/maps, attire,
  RSVP configuration, gift preferences, hashtag, music and video.
- `data/entourage.ts`: paired parents, sponsors and wedding party.
- `data/faqs.ts`: guest guidance and approved guest policies.
- `data/media.ts`: cover/background, artwork, attire and slideshow assets.
- `data/prenup-media.ts`: uploaded R2 prenup URLs and image dimensions.
- `sections/`: ordered invitation content in small groups.
- `components/`: navigation, opening, page turn, slideshow, RSVP and presentation.
- `utils/page-fold.ts`: preserved page-fold geometry.
- `styles/wedding.css`: isolated `vg-` selectors, variables and animations.
- `assets/fonts/`: independently bundled heading font and its source notice.
- `../../public/vincent-and-gabrielle/`: local public media and body fonts/licenses.

The shared `components/smart-rsvp` hooks are reused. There are no runtime imports,
asset URLs or styles referencing another client folder. The body font is
registered under its own family name, and the existing 700px breakpoint is
expressed locally through Tailwind utilities. No shared configuration is changed.

## Content and media handoff

Approved VG monograms, venue/attire artwork, the forest background, and two
five-photo collections are connected through `data/media.ts`. The Us collection
uses `Main1-1.webp` through `Main1-5.webp` in order; Together uses `Group1-1.webp`
through `Group1-5.webp` in order. Both reuse the existing uploaded R2 photographs
under `https://assets.moderninvites.com/placeholder-images/prenups/`, with URLs
and dimensions configured in `data/prenup-media.ts`. Unused local JPEG copies
were removed on 2026-10-11. `Main1-2.jpg` remains for the portfolio; other local
cover/artwork imports remain in use. Removed originals are recoverable from Git;
see the [cleanup manifest](../../docs/media-cleanup-2026-10-11.json).
Together uses individual focal points and caps
the mobile frame at a 3:5 crop to keep both people visible on tall screens.
Referenced supplied assets remain available in
the local asset folders. Photos are described without assuming the subjects'
identities. No former-client personal names or guest information are retained.
The supplied `Main1-4` photo has visible distortion in its lower portion;
replace it with a clean export when available.

For replacement prenups, update their URLs and dimensions in `data/prenup-media.ts`,
using a new filename/version URL and matching optimizer allowlist when necessary.
Update alt text and focal positions in `data/media.ts`. Keep replacement design
and cover assets in the client asset folders. Update `sharingMedia` when
replacing the cover files. CSS crops the transparent margins of the supplied VG
logos; opening movement adapts to those bounds with its original timings.
Place approved music/video in dedicated folders under this client's public folder
and set their paths in `data/wedding.ts`. The approved soundtrack is “The One” by
Kodaline, stored independently in `public/vincent-and-gabrielle/music/the-one.mp3`.
The generic `public/videos/prenup.mp4` is connected as a temporary film, copied to
`public/vincent-and-gabrielle/video/prenup-placeholder.mp4` for client isolation.
Replace it with the couple's final film when available. The gift
QR and registry instructions are intentionally omitted.

Dress code, RSVP questions, FAQs and gift wording follow the reference template
as requested: Formal or Cocktail, reserved bridal/wedding-party colors,
adults-only, invited guests only, an unplugged ceremony, and a preference for
financial gifts. RSVP collects attendance, phone/email, dietary needs and an
optional song request. The confirmed RSVP deadline is 15 December 2026.

The venue View map buttons use the supplied San Agustin Church and La Castellana
Google Maps links.

Still needed: parking, guest-list setup, contact
details, and any desired hashtag or video.

## RSVP activation (owner action)

`rsvpEnabled` defaults to `false`. This preserves the search card without mounting
the network-backed form or making RSVP requests. The owner should provision a
distinct event with slug `vincent-and-gabrielle`,
access mode `name_search`, response mode `household`, and its own approved guest
list. Activate the event, then set `rsvpEnabled` to `true`. The existing backend
supports one optional free-text question via its message field; additional
questions require an explicit mapping before enabling them.

Verify name lookup, invitation selection, attendee limits, saved replies and
response locks manually. No Supabase access, guest import, event provisioning,
DNS setup or deployment has been performed. Never reuse another event's ID or
guest list. Private environment files must not be read or loaded for validation.

## Validation

TypeScript and invitation ESLint checks pass. An isolated Next.js production
build passes with this route, shared RSVP/UI code and local fonts, excluding
private environment files and server APIs. This is not a full production build
of every invitation. Existing shared Tailwind configuration emits warnings for
unrelated utility classes when scanning the complete repository.

Browser checks covered 1440×900, 768×1024, 390×844 and 320×568 viewports, opening
and page navigation, forward/backward turns, swipe, slideshow dots/keyboard,
FAQ exclusivity, pending RSVP, countdown placeholders and the sharing image.
No browser errors were observed during those checks.
Recheck these layouts after confirmed content replaces the pending details.

The slideshows now use quality 85 and Next.js's responsive image widths instead
of a custom 1920px minimum. Together's responsive sizing includes its mobile
3:5 crop cap. The shared image optimizer caches stable invitation images for at
least 31 days. Remote prenups use stable R2 URLs; local artwork retains static
imports with content-hashed URLs when its source files change. Photo order, focal
points and slideshow controls are preserved.

R2 prenup migration verified October 7, 2026: all ten public WebP sources returned
HTTP 200 with matching upload hashes and configured dimensions. The verification
report is in `docs/media/r2-prenup-verification.json`. The isolated production
build, lint and full-project type check passed. Both slideshows loaded their R2
sources through Next Image at 375x812, 768x1024 and 1440x900 with no console errors
or horizontal overflow; photo-dot navigation was checked. Local slideshow JPEGs
are absent from the production static media. No R2 uploads or deployment were
performed; deployment is required to apply these changes to the live invitation.
