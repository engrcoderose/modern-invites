# Anjo & Jasmin — second invitation

Route: `/anjo-and-jasmin`. The original `/jasmin-and-anjo` is unchanged.

Uses Eric and Li's envelope opening, centered photo hero, countdown, photo gallery adapted to three desktop columns, split story panels, central program timeline, entourage cards, paired venue card, attire columns, hashtag, gift information, and RSVP layout. All couple content and media come from the first Anjo and Jasmin invitation. The FAQ uses the existing wedding details and reflects the confirmed 3:00 PM ceremony and preview-only RSVP status.

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
- Our Story retains all three original chapters, with staggered arched photo frames, connected chapter markers, and the existing closing photo quotation.
- The local wedding program now uses the first sample's illustrated dotted timeline and scroll-driven marker, retaining the confirmed ceremony time and sample labels for the other events.
- RSVP uses a unified photo-and-form card, stacked mobile fields, attendance choices, and a local preview/edit flow.
