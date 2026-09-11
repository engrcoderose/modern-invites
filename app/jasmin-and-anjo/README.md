# Anjo & Jasmin

Route: `/jasmin-and-anjo`.

Adapted from the Isabella & Daniel invitation with a floral photo welcome screen, cinematic photo hero, scroll animations, music, editorial sections, gallery, attire, guest guide, and RSVP preview. All components are isolated from the original invitation. The palette combines ivory, blush, sage, powder blue, and botanical accents.

Edit `data.ts` for the sample story, program, entourage names, and palette. The section order is assembled in `page.tsx` and media in `media.ts`; the welcome photo, floral border, and music are configured in their components. Sample content and media remain placeholders.

Confirmed details: Anjo Caluya and Jasmin Sopera; November 21, 2026; San Bartolome Parish, Malabon; reception at St. John XXIII Hall, San Bartolome Parish, Malabon. The attire is cocktail/semi-formal in the supplied pastel palette. Ceremony time remains unconfirmed. The countdown targets the start of the wedding date in Manila time.

RSVP is explicitly a preview. No responses are sent or saved. Connect this form to the couple's event before enabling actual response collection. The invitation has no save-the-date wording or calendar CTA. Background music starts on opening and has a pause control.


Styling conventions (also recorded in `AGENTS.md`):
- Use Tailwind in components for layout, responsive breakpoints, typography, colors, spacing, borders, shadows, positioning, and ordinary hover/focus states.
- Keep complex keyframes, coordinated animation playback, gallery masks, textures, and document-level browser behavior in `wedding.css`.
- Motion handles runtime scroll progress and springs in the timeline, cinematic section, reveal wrapper, and progress bar. Keep static formatting in Tailwind even on Motion elements.
- Use complete Tailwind class names. Dynamic palette colors, photo positions, and scroll progress are passed as typed runtime values.
- `SectionLabel` and `Botanicals` merge local utility overrides with `cn`.

Code organization:
- `page.tsx` assembles sections in their existing order.
- `data.ts` contains wedding details, the confirmed hashtag, sample story/program/entourage, and attire palette. Story/program fields match their component types directly.
- `media.ts` contains the section images and placeholder gallery; `prenup-media.ts` shares the local photos used by the hero and Polaroid strip.
- `GiftSection` renders the gift guide; `HashtagSection` owns the interactive copy button. `GiftAndHashtagSections` composes them.
- `hooks/usePageVisibility.ts` shares hidden-tab handling across the hero, Polaroids, and gallery.
- The guest guide component is available but is not rendered in the invitation.

The hero uses five local couple photos, a 3.5-second interval after the next image loads, and 1.8-second CSS crossfades. Playback pauses offscreen, in hidden tabs, and for reduced-motion preferences. The Polaroid and gallery tracks retain their pause controls and static reduced-motion layouts.

Validation:
- Run `npx tsc --noEmit --noUncheckedSideEffectImports`.
- Check desktop and mobile layouts, especially the opening screen, hero, square Polaroids, gallery columns, and single-card timeline.
- Check pause/resume, gallery open/close, hashtag copy, navigation, and the RSVP preview after interaction changes.

Naming convention: always list the groom first when naming the couple: Anjo & Jasmin, Anjo Caluya and Jasmin Sopera, and A & J for initials. Apply this to visible text, metadata, and accessibility labels.
