# Anjo & Jasmin

Route: `/jasmin-and-anjo`.

Adapted from the Isabella & Daniel invitation with a floral photo welcome screen, cinematic photo hero, scroll animations, music, editorial sections, gallery, attire, guest guide, and RSVP preview. All components are isolated from the original invitation. The palette combines ivory, blush, sage, powder blue, and botanical accents.

Edit `data.ts` for the sample story, program, entourage names, and palette. The media and guest guide are assembled in `page.tsx`; the welcome photo, floral border, and music are configured in their components. Sample content and media remain placeholders.

Confirmed details: Anjo Caluya and Jasmin Sopera; November 21, 2026; San Bartolome Parish, Malabon; reception at St. John XXIII Hall, San Bartolome Parish, Malabon. The attire is cocktail/semi-formal in the supplied pastel palette. Ceremony time remains unconfirmed. The countdown targets the start of the wedding date in Manila time.

RSVP is explicitly a preview. No responses are sent or saved. Connect this form to the couple's event before enabling actual response collection. The invitation has no save-the-date wording or calendar CTA. Background music starts on opening and has a pause control.


Styling conventions:
- Use Tailwind classes in each component for fonts, text sizes, colors, spacing, borders, and simple flex layouts.
- Keep coordinated responsive layouts, floral positioning and filtering, gradients, keyframes, gallery masks, and motion preferences in `wedding.css`.
- The welcome screen is in `components/OpeningScreen.tsx`. Its mobile composition and flower offsets remain in the `max-width: 600px` CSS block; short landscape screens have a separate height-based rule.
- `SectionLabel` accepts `className` for explicit local styling. Avoid selectors that infer text colors from other utility class names.

The hero slideshow is configured in components/HeroSection.tsx: five local couple photos, a 6.5-second interval, and 1.8-second CSS crossfades. Playback pauses offscreen, in hidden tabs, and for reduced-motion preferences; photo selection remains available. The floral foreground uses the local down-flowers.png asset.

Naming convention: always list the groom first when naming the couple: Anjo & Jasmin, Anjo Caluya and Jasmin Sopera, and A & J for initials. Apply this to visible text, metadata, and accessibility labels.
