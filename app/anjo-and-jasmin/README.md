# Anjo & Jasmin — second invitation

Route: `/anjo-and-jasmin`. The original `/jasmin-and-anjo` is unchanged.

Uses Eric and Li's envelope opening, centered photo hero, countdown, photo gallery adapted to three desktop columns, split story panels, central program timeline, formal entourage sheet, paired venue card, centered attire layout, hashtag, gift information, and RSVP layout. All couple content and media come from the first Anjo and Jasmin invitation. The FAQ uses the existing wedding details and reflects the confirmed 3:00 PM ceremony and preview-only RSVP status.

`data.ts` shares the original wedding content and applies the confirmed details to this route only. Photos, video, music, botanical illustrations, outfit illustrations, and gift/hashtag/footer content reference the existing sources. Couple names display groom-first. The ceremony is confirmed for November 21, 2026 at 3:00 PM Philippine time; the countdown targets that time. The reception follows at 2/F, St. John XXIII Hall, San Bartolome Parish, Malabon. Other timeline entries remain samples. The cocktail/semi-formal wording and seven dress-code colors follow the supplied reference. RSVP remains a local preview; no responses are sent or saved.

The new route owns its layout and scoped CSS. Shared source components are imported without edits. The opening sections are hero, countdown, Polaroid strip, prenup introduction and video, gallery, and Our Story. The original six-photo Polaroid strip replaces the six-photo grid. It retains square prints, captions, seamless scrolling, pause/resume, hover pause, hidden-tab/offscreen pausing, and a static reduced-motion layout. Opening starts the existing music from a user gesture; playing the prenup video pauses it. Photo previews support Escape, close, and focus return. Navigation supports a mobile menu and reduced motion.

Validate with `npx tsc --noEmit --noUncheckedSideEffectImports`, a production build, and desktop/mobile checks of opening, navigation, gallery, music/video, hashtag, map links, and RSVP preview.

Verified during implementation: TypeScript with side-effect import checks, production build, 1440px desktop and 390px mobile layouts, no horizontal overflow or browser errors, photo dialog and Escape close, mobile navigation, hashtag copy, preview-only RSVP submission, and prenup playback pausing background music. Both original invitation directories have no changes.


Music and guest information:
- `backgroundMusic` in `data.ts` accepts up to four tracks. All three existing songs in `public/music` are included, with Libu-libong Buwan first. The player offers track selection, previous/next with wraparound, automatic advancement, pause/resume, and volume. Playing the prenup pauses music; choosing music pauses the prenup.
- Add the couple's real HTTPS registry links to `giftRegistries` in `data.ts`. The Gift Registry section shows the existing pending-details message until links are supplied, then renders the configured registry cards.
- Edit `faqs` in `data.ts` for the accordion answers. FAQ and Gift Registry have navigation links on desktop and mobile.


Presentation updates:
- The hero crossfades through five existing prenup photographs every five seconds, with photo selection and pause/play controls. It pauses offscreen and when the tab is hidden; reduced motion disables autoplay and transitions. Slide configuration is in `media.ts`.
- Our Story retains all three original chapters in the Eric-and-Li alternating rectangular photo/text layout. Its closing quotation shows the full uncropped image, separated by a responsive cream gap.
- The local wedding program now uses the first sample's illustrated dotted timeline and scroll-driven marker, retaining the confirmed ceremony time and sample labels for the other events.
- RSVP uses a unified photo-and-form card, stacked mobile fields, attendance choices, and a local preview/edit flow.

Decorative variations:
- Existing watercolor meadows, cosmos, vines, daisies, and blue/pink flowers appear in section-specific compositions through `FloralAccent.tsx`. Decorative images are hidden from assistive technology and do not intercept controls.
- The countdown keeps its original layout; prenup uses formal double-border stationery; the Polaroid strip uses blush paper; the gallery uses cream photo mats; the timeline uses a powder-blue surround.
- The entourage is a bordered programme sheet, the hashtag keeps its original centered layout, FAQ uses an editorial two-column layout, and useful information separates sage preparation details from an arched gift note. Attire retains circular swatches and the single supplied outfit image.
- Local copies of the prenup, Polaroid, and hashtag components keep these presentation changes isolated to this route.

The newer `flower-frame.png`, `flower-border.png`, and `flowers.png` provide the gift-note frame, gallery-break corner, and RSVP wildflower finish. The original `floral-designs.png` vine is restricted to the entourage section. The Polaroid strip has no floral accent or visible photo captions.

Additional floral variants: `rose-flower.png` above the dress-code heading; `single-flower-2.png` and `single-flower-3.png` in the FAQ bouquet; `water-color-flowers.png` above Other Useful Information. These replace earlier accents rather than adding repeated background vines.

After the dress code, `PhotoSlideshow` shows five existing prenup photos as a centered landscape image over a faded full-width duplicate. Both layers crossfade together every five seconds. It loads near the viewport, waits for both images before advancing, pauses offscreen or when hidden, offers photo selection and pause/play, and uses manual navigation with reduced motion. Photos are configured in `afterDressCodeSlides` in `media.ts`.
