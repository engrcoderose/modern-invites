# Anjo & Jasmin — second invitation

Route: `/anjo-and-jasmin`. This invitation is self-contained and has no imports from other invitation folders.

Owned files: `assets/images` contains copied photographs and decorative artwork; `components/motion/Reveal.tsx`, `components/SectionPetals.tsx`, `hooks/usePageVisibility.ts`, `lib/events.ts`, and `types.ts` are local copies. `photo-media.ts` and `prenup-media.ts` define the local image sources; `media.ts` configures galleries, slideshows, and the timeline. `data.ts` and `wedding-details.ts` retain this couple's confirmed content. Event names use the `anjo-and-jasmin:` prefix.

Public media is independently stored under `public/images/anjo-and-jasmin`, `public/videos/anjo-and-jasmin`, and `public/music/anjo-and-jasmin`. Source files in the sample remain intact. Run `node --experimental-strip-types --test tests/anjo-invitation-isolation.test.mts` to check local import boundaries and public media paths.

Uses a 3D stationery envelope opening, centered photo hero, countdown, layered portrait photo carousel, split story panels, central program timeline, formal entourage sheet, paired venue card, centered attire layout, hashtag, gift information, and RSVP layout. The original couple content and media are preserved in local copies. The FAQ uses the existing wedding details and reflects the confirmed 3:00 PM ceremony and preview-only RSVP status.

`data.ts` re-exports the confirmed local wedding content from `wedding-details.ts` and supplies the guest guidance for this route. Photos, video, music, botanical illustrations, outfit illustrations, and gift/hashtag/footer content use this invitation's own files. Couple names display groom-first. The ceremony is confirmed for November 21, 2026 at 3:00 PM Philippine time; the countdown targets that time. The reception follows at 2/F, St. John XXIII Hall, San Bartolome Parish, Malabon. The confirmed timeline is ceremony at 3:00 PM, photos at 4:00 PM, guest registration and cocktails at 5:00 PM, reception program at 6:00 PM, dinner at 7:30 PM, and party at 10:00 PM. Sponsor and guest attire guidance and eight dress-code colors follow the supplied reference. RSVP remains a local preview; no responses are sent or saved.

The new route owns its layout and scoped CSS. Its components, animation helpers, hooks, and event constants are owned locally. After the envelope opens, the prenup film is the first section: a centered landscape player in a champagne frame over a dimmed couple photo, with navigation above and a scroll cue leading to the wedding hero. The hero, countdown, gallery, and Our Story follow. The former introduction panel has been removed. The original six-photo Polaroid strip replaces the six-photo grid. It retains square prints, captions, seamless scrolling, pause/resume, hover pause, hidden-tab/offscreen pausing, and a static reduced-motion layout. Opening starts the existing music from a user gesture; playing the prenup video pauses it. Photo previews support Escape, close, and focus return. Navigation supports a mobile menu and reduced motion.

Validate with `npx tsc --noEmit --noUncheckedSideEffectImports`, a production build, and desktop/mobile checks of opening, navigation, gallery, music/video, hashtag, map links, and RSVP preview.

Verified during implementation: TypeScript with side-effect import checks, production build, 1440px desktop and 390px mobile layouts, no horizontal overflow or browser errors, photo dialog and Escape close, mobile navigation, hashtag copy, preview-only RSVP submission, and prenup playback pausing background music. 


Music and guest information:
- `backgroundMusic` in `data.ts` accepts up to four tracks. All three songs have independent copies in `public/music/anjo-and-jasmin`, with Libu-libong Buwan first. The player offers track selection, previous/next with wraparound, automatic advancement, pause/resume, and volume. Playing the prenup pauses music; choosing music pauses the prenup.
- Add the couple's real HTTPS registry links to `giftRegistries` in `data.ts`. The Gift Registry section shows the existing pending-details message until links are supplied, then renders the configured registry cards.
- Edit `faqs` in `data.ts` for the accordion answers. FAQ and Gift Registry have navigation links on desktop and mobile.


Presentation updates:
- The hero crossfades through five existing prenup photographs every five seconds, with photo selection and pause/play controls. It pauses offscreen and when the tab is hidden; reduced motion disables autoplay and transitions. Slide configuration is in `media.ts`.
- Our Story retains all three original chapters in the Eric-and-Li alternating rectangular photo/text layout. Its closing quotation shows the full uncropped image, separated by a responsive cream gap.
- The local wedding program now uses the first sample's illustrated dotted timeline and scroll-driven marker, with all six event times and titles from the supplied wedding timeline.
- RSVP uses a unified photo-and-form card with one required full-name field and a local preview/edit flow. Blank or whitespace-only names are rejected; accepted names have extra whitespace normalized. Attendance and note fields are removed. This preview does not verify guest-list membership or send/save responses.

Decorative variations:
- Existing watercolor meadows, cosmos, vines, daisies, and blue/pink flowers appear in section-specific compositions through `FloralAccent.tsx`. Decorative images are hidden from assistive technology and do not intercept controls.
- The countdown keeps its original layout; prenup opens in a framed player over a full-height photo backdrop; the Polaroid strip uses blush paper; the gallery uses cream photo mats; the timeline uses a powder-blue surround.
- The entourage is a bordered programme sheet, the hashtag keeps its original centered layout, FAQ uses an editorial two-column layout, and useful information separates sage preparation details from an arched gift note. Attire retains circular swatches and the single supplied outfit image.
- Local copies of the prenup, Polaroid, and hashtag components keep these presentation changes isolated to this route.

The newer `flower-frame.png`, `flower-border.png`, and `flowers.png` provide the gift-note frame, gallery-break corner, and RSVP wildflower finish. The original `floral-designs.png` vine is restricted to the entourage section. The Polaroid strip has no floral accent or visible photo captions.

Additional floral variants: `rose-flower.png` above the dress-code heading; `single-flower-2.png` and `single-flower-3.png` in the FAQ bouquet; `water-color-flowers.png` above Other Useful Information. These replace earlier accents rather than adding repeated background vines.

After the dress code, `PhotoSlideshow` shows five existing prenup photos as a centered landscape image over a faded full-width duplicate. Both layers crossfade together every 3.5 seconds once the next pair is ready. It loads near the viewport, pauses offscreen or when hidden, and displays a static photo with reduced motion. Slideshow controls are hidden. Photos are configured in `afterDressCodeSlides` in `media.ts`.

Performance update (September 14, 2026):
- `invitation.tsx` loads the full `InvitationContent` separately and warms its code and opening video poster during the envelope opening animation.
- Both slideshows request the current photo and then the next photo, rather than requesting every slide together. Loaded slides remain available for later loops.
- The prenup poster loads near the viewport through Next image optimization. The local 1200px WebP response measured 74,268 bytes compared with the 1,065,443-byte source (about 93% smaller); negotiated formats and sizes may vary.
- The opening poster loads immediately, while video and audio use `preload="none"`; playback still follows the existing guest interaction. The countdown stops its interval while offscreen or in a hidden tab and refreshes on return.
- This update passed TypeScript checks and desktop/mobile interaction checks for opening, slideshows, navigation, photo previews, music/video interaction, and RSVP preview. No production performance score was measured for this update.

Reference palette: UI colors are scoped to `.classic-garden-invitation` in `wedding.css` and used through Tailwind color utilities. Cream (#F5F2EE), yellow sand (#F1E0CB), clay (#CFA999), and terracotta (#9F5434) match the supplied reference. Cream/sand form the main surfaces, the countdown uses cream with dark brown text, clay colors the navigation and the full gallery background, and terracotta highlights buttons and headings. Dark brown text keeps the light surfaces readable. Muted olive remains a secondary garden accent. The `aj-botanical` filter softens decorative artwork only; photographs, video, and the confirmed attire swatches keep their original colors.

Local preview: when another development server is running in this checkout, give port 3001 its own build output to prevent mismatched styles and font classes. In PowerShell, set `$env:NEXT_DIST_DIR = '.next-preview-3001'`, then run `node node_modules/next/dist/bin/next dev --port 3001`. The default build output remains `.next` when the variable is unset.

Envelope opening: the supplied video reference is recreated with a top-edge perspective hinge, a wax seal attached to the flap, photorealistic cotton paper with embossed botanical relief, and moving interior shadows. The 2.8-second sequence spends its time on a slow flap lift, then crossfades into the prenup section as the flap clears without pausing on the interior; reduced motion opens immediately. Content prepares beneath an inert overlay and receives focus only after the envelope is gone.

Realistic stationery finish: desktop presents the envelope on a softly lit neutral surface with cast shadows; mobile retains the full-screen opening. A generated paper photograph (`embossed-cotton-paper.png`) supplies the raised flowers and fibers, with live script lettering, fine fold edges, and the original wax seal. The asset provenance and exact prompt are saved beside the image.

Main gallery: a centered portrait photo is flanked by angled, softly faded cards. All 12 existing photos remain available using arrows, navigation dots, side-card selection, horizontal touch swipes, and Left/Right/Home/End keys. The center photo opens the existing full-size preview with Escape and focus return. Transitions respect reduced motion; the gallery does not auto-advance.

The active invitation uses the nine clean cinematic photographs (`cinematic-image-2.jpg` through `cinematic-image-10.jpg`) for its hero, gallery, story, film poster, venue background, and RSVP image. `prenup-media.ts` owns these sources and `media.ts` defines descriptive alt text and subject-aware crops. The extensionless `cinematic-image-1` is retained as supplied but excluded because it contains screenshot controls. The film, venue illustration, reception map, and attire artwork remain unchanged.

The opening prenup film autoplays muted and inline only after the envelope finishes opening. Guests can enable sound or pause using the native video controls. Playback pauses the background soundtrack, and choosing music pauses the film. If autoplay is blocked, the native play control remains available.

Scrolling beyond the prenup video pauses the film and resumes the soundtrack. This handover occurs once per video playback; a guest's manual music pause is preserved during subsequent scrolling. Playing the video again pauses the music as before.
