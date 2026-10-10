# Ryan & Anne

Route: `/ryan-and-anne`. An editorial wedding invitation in black, champagne gold, and ivory. Headlines use Mea Culpa; body copy and details use self-hosted Noto Serif; the hero date and location use self-hosted Roboto Mono. Font files and licenses live in `assets/fonts/`.

## Structure

`page.tsx` composes the sections in this order:

Envelope opening → Hero → Invitation → Countdown → Love story → Portrait carousel → Venues → Schedule → Entourage → Photo break → Dress code → Hashtag → Three-photo break → Gallery → RSVP → Footer.

- `data/`: wedding content, entourage, story, photo selections, focal points, and artwork imports.
- `sections/`: page sections.
- `components/`: navigation, shared presentation, slideshow playback, and gallery interactions.
- `styles/wedding.module.css`: scoped typography, decorations, backgrounds, and animation. Simple layout uses Tailwind utilities.
- `assets/design/`: supplied monograms, flower, heart keychain, pattern, attire guides, and venue images.

## Content

The supplied wedding questionnaire is the source for `data/wedding.ts`, `data/story.ts`, and `data/entourage.ts`. Invitation wording in `data/invitation.ts` comes from the user's design reference. The administrative contact email is excluded from public data.

The ceremony is November 22, 2026, at 2:00 PM in `Asia/Manila`. Countdown and schedule date labels use the ceremony timestamp. Venue map links use each supplied venue name and address unless a confirmed `mapUrl` is configured.

Pending details remain unset:

- Bride's parents, principal sponsors, veil/candle/cord sponsors, flower entourage, and coin bearer. Blank groups remain hidden; best man is explicitly not applicable.
- Reception start time and any schedule events after the confirmed cocktail hour.

Metadata remains `noindex, nofollow` during review.

Refreshing restarts the envelope opening. Opening reveals `#top` and starts the hero introduction; section navigation works afterward and query parameters are preserved.

The RSVP reuses the shared `SmartRsvpFlow` in full-name search mode for the confirmed admin event slug `ryan-and-anne`, with this invitation's black and ivory theme. It searches the invited guest list, loads the selected party, records attendance and optional dietary/contact notes, and shows a confirmation through the existing `/api/rsvp` endpoints. See `docs/rsvp-setup.md` for the admin setup and manual live checks.

## Images and interactions

Public prenup URLs are centralized in `data/prenup-media.ts` under `https://assets.moderninvites.com/ryan-and-anne/images/prenups/`. The client's replacement selection contains 20 retained photos and 10 newly uploaded photos; nine previous photos have been removed from the active catalog. Original and optimized replacement files live in `assets/prenup/`; optimization and upload verification records remain in `docs/media/`. Local artwork uses static imports.

The uploaded “You're Still The One” by Shania Twain streams from its public R2 URL in `data/wedding.ts`. Tapping or keyboard-activating the envelope starts audio in the same interaction. The floating play/pause control appears after opening, with looping playback at 40% volume and retry feedback. Audio uses `preload="none"`.

`InvitationExperience` coordinates the opening and music. The stationary envelope releases its ivory seal, lifts its textured lace flap, and crossfades into the prepared hero over 2.8 seconds, matching the Anjo and Jasmin opening timing. Complementary artwork masks keep the pocket and hinged flap separate. Hero/reveal animations wait until opening finishes. Keyboard focus stays in the opening screen and then moves to the hero heading without an outline; the opening button indicates keyboard focus by underlining its instruction. Reduced motion opens immediately; without JavaScript, the invitation content remains available. Artwork generation details are in `docs/media/envelope-artwork.md`.

Next Image uses responsive sizes, default quality for ordinary photos, and quality 85 for slideshows. Only the first hero photo is prioritized; later images load as needed. Optimizer failures fall back once to the compressed source. Preserve the shared 31-day image cache TTL and narrow client remote pattern.

The hero advances every five seconds and the story carousel every seven seconds while visible. Playback waits for image loading, pauses offscreen or in hidden tabs, and respects reduced motion. Keyboard controls and pause controls remain available. Portrait story slides use their own responsive sizes rather than requesting the landscape cover width. The gallery shows unused photos; its native-dialog lightbox supports arrow keys, Escape, focus trapping, and focus restoration.

Keep the 17 featured sources unique across the hero, story carousel, entourage photo break, hashtag section background, and hashtag photo break, including its backdrop. `data/gallery.ts` excludes these and the story collage, schedule, and RSVP photos, except `outdoor-road-holding-hands`, which is intentionally shown in both the hero and gallery. Its eleven photos fill twelve grid cells because the first portrait spans two rows, completing both the two-column mobile and three-column desktop grids. Standalone section photos are centralized in `data/section-photos.ts` so gallery exclusions follow their selections.

Media records:

- `docs/media/prenup-optimization.json`: filename mapping, dimensions, file sizes, and hashes.
- `docs/media/prenup-new-photos-optimization.json`: optimization records and R2 keys for the ten replacement additions.
- `docs/media/r2-prenup-verification.json`: public source verification.
- `docs/media/r2-new-prenup-verification.json`: public verification for all ten newly uploaded sources.
- `docs/media/featured-photo-usage.json`: featured photo allocation and hashes.

## Local checks

Hero names reveal in sequence with a flowing ink effect over 6.15 seconds, preserving the Mea Culpa lettering and flourishes. The announcement, date/location, and scroll cue ease in afterward. Reduced motion displays everything immediately, and keyboard focus exposes the scroll link without waiting.

Champagne petals drift gently over the invitation, with eight on mobile and sixteen on larger screens. They never intercept input, pause in hidden tabs, and disappear for reduced motion. A pause/resume control appears when focused with the keyboard.

Text and photo frames reveal once with a soft fade and small upward movement. Elements entering together stagger by 100 ms, capped at 300 ms. Image reveals last 1.1 seconds; text reveals last 850 ms. Individual CSS translation preserves artwork rotations. Server-rendered content stays visible without JavaScript, reduced-motion preferences disable reveals, and keyboard focus immediately exposes any pending content.

Run client ESLint and repository TypeScript directly. Next dev/build/start must use the isolated `.next-preview-ryan-anne-site/site` preview, which excludes private environment files, middleware, auth, API, and Supabase modules. Never load real credential files or access Supabase.

For UI changes, check common mobile, tablet, and desktop layouts, navigation, image loading, gallery controls, and browser errors. Review screenshots live in `.next-preview-ryan-anne-media/`.
