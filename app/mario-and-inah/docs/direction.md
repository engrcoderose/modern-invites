# Mario & Inah — floral reference redesign

Scope: /mario-and-inah. Mode: Experience. Reference: C:/Users/Spades/Downloads/4.png. Preserve confirmed names, date, venue, schedule, entourage, attire and email RSVP. Couple photographs use the supplied studio collection with optimized sources hosted on R2; sample notices and per-image watermarks are removed. The uploaded Panaad Garden venue photograph is displayed.

## Direction contract

THESIS: A continuous floral wedding scroll that opens on a photograph, following the supplied reference's section composition.

OWN-WORLD: Cream floral paper, pale sage botanical pattern, lilac venue field and blush stationery. Imperial Script titles, Libre Baskerville details and dark olive ink. Use the supplied flowers in assets/designs for the reference sections. Woodland photography grounds three staggered portrait photographs.

STORY: Full-screen photo welcome → slideshow hero → floral countdown → full-width photo → entourage → woodland gallery → venue. No navigation row is rendered. Confirmed schedule, attire, closing photo and email RSVP continue below. The invitation-details section and its Save our date action are removed at the user's request.

FIRST VIEWPORT: Full-screen photo cover inspired by the earlier client openings: warm ivory names/date, a delicate frame, corner butterfly florals, a short lettering/flower entrance and slow photo drift. Open invitation prepares the hero, lets the copy and florals recede, pushes the photograph forward, and dissolves the cover over 750ms. The hero fades in after 240ms; focus and scrolling are restored after the cover clears. Reduced motion skips spatial effects. Direct section links bypass the cover, and without JavaScript it remains inline with a working native anchor.

FORM: User-pinned reference and first-screen choice; code-led. No concept tournament. Content stays visible without JavaScript; reduced motion disables the scroll indicator. The footer greeting and under-form email-app/direct-contact note are removed. Email-draft preparation requires JavaScript; the review/send explanation appears after preparation.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Content constraints

Reference photo subjects and sample entourage names are not client facts. Preserve confirmed event data and use the supplied couple photographs. The venue uses assets/designs/wedding-venue.jpg supplied by the user. RSVP prepares a mailto draft without automatically sending or storing it. No private environment-file access or Supabase.

Secondary sponsor names and the individual ring bearer remain pending; no invented content or inactive media controls are displayed.

## Current evidence

Repository-root .impeccable/review/mario-reference/ contains eleven desktop/mobile/tablet captures, checks.json and finish-review.md. The finish review passes reference fidelity and identifies documentation persistence as its sole material correction. DESIGN.md and the client-local .impeccable/design.json record the shipped implementation rather than earlier cover, arch or Polaroid directions.




Countdown flower refinement: both corner sprays shift outward by 25% of their width and use bottom-5 (20px above the bottom edge), with no vertical translation. Keep the heading and four units centered.

Entourage corner flowers shift outward by one quarter of their width and use bottom-3 (12px above the bottom edge), with no vertical translation.
The venue panel explicitly labels the confirmed time as Ceremony at 4:00 PM.

Both photo breaks fill at least one dynamic viewport height, edge to edge, with cover cropping and responsive image sizes accounting for the landscape source aspect ratio.

The hero cycles through four configured couple photographs with a 900ms fade and 3-second reading interval. Each photo slowly zooms from 1 to 1.03 over 3.9 seconds, continuing gently through its crossfade; zoom pauses with playback and offscreen/hidden-page state and is removed for reduced motion. Hero copy remains independent of slideshow changes; first-entry text reveals and gentle floral parallax run separately. Only the first photo loads initially; each next photo is mounted when requested and decoded before replacing the current image. Controls support pause/play, direct selection and left/right arrow keys. Focused selection pauses autoplay. Offscreen and hidden-tab playback stops; reduced motion disables autoplay and uses instant manual changes. With JavaScript disabled the first photo remains visible and controls are omitted.


The refined welcome stacks Mario and Inah in ivory Imperial calligraphy, separated by a smaller Libre Baskerville ampersand. A fine hairline and diamond divider sits beneath the confirmed date, and a transparent outlined Open invitation action completes the composition. The names enter in a restrained stagger; short-height screens scale the lettering down while keeping the action visible. The existing photo drift, floral exit and cover dissolve remain intact.


Text entrances emphasize the wedding names: the welcome lettering softly resolves from 2px blur with an 18px rise and 220ms name stagger, followed by its date and location. Section calligraphy resolves over 900ms from 25% opacity and a 14px rise; supporting text uses a quieter 700ms fade and 10px rise. Entourage names animate individually with a short row stagger capped at 200ms, while role labels stay separate. The hero title animates its inner lettering without moving keyboard focus. Content remains visible by default and animations run once, settle on interruption, and honor live reduced-motion preferences.

