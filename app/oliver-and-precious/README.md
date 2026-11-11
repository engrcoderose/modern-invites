# Oliver & Precious

Route: /oliver-and-precious. Independent adaptation of Vincent & Gabrielle's page-turning invitation, retaining its opening, navigation, typography, photo transitions, keyboard controls and reduced-motion behavior.

Confirmed event: 18 March 2026, ceremony at 3:00 PM at Cove Garden, Cagayan de Oro. Reception at Cove Garden (Talisay Pavillion), 7:00–9:00 PM. The supplied 2026 date is preserved, even though it is in the past relative to development. See data/wedding.ts for editable content and the full timeline; data/faqs.ts contains the five supplied policies in complete sentences. Only the supplied bride's parents are listed; other entourage names are omitted.

Palette: white paper, sage/olive details, minimal dusty pink accents. The local OP SVG stationery replaces the template's VG artwork. Venue icons are decorative and do not depict the actual buildings. Map links search the supplied venue names; exact map pins have not been supplied.

Client design rules: retain the selected template's woodland backdrop, oval stationery cover, deliberate opening transition and page-turning book. In `styles/wedding.css`, the scoped palette is paper `#ffffff`, olive `#5a6946`, ink `#414636`, muted text `#646650`, rule lines `#b5bda9` and dusty pink `#c89da4`. The inherited `--op-gold` variable now holds that pink accent; keep it restrained on ornaments rather than expanding it into large surfaces. Anastasia Script is the expressive heading face, paired with local OP Noto Serif for readable text and controls. Preserve these client values independently of the root marketing design system, alongside the existing keyboard, swipe, focus and reduced-motion behavior.

Pending owner materials: personal photographs, monogram if desired, gift QR code, optional music, remaining entourage, RSVP deadline and admin event/guest configuration. The Us and Together pages currently retain the template's sample prenup photos, explicitly labeled as samples; these are not claimed to portray this couple. No sample music is connected. The save-the-date video and its placeholder have been removed; the closing message and wedding date remain.

RSVP stays disabled and makes no requests. Its existing integration is ready for a distinct event with slug oliver-and-precious, access mode name_search, response mode household and this couple's guest list. Provision it manually, then enable rsvpEnabled in data/wedding.ts. Do not reuse another event's ID. No backend records, credentials or Supabase projects were accessed.

All files and fonts are isolated in this client folder and public/oliver-and-precious/fonts. Template photographs reuse the established shared placeholder-image URLs. No shared styles, routing configuration or image settings were changed. The existing image optimizer widths, quality 85 slideshows and 31-day cache policy are preserved.
