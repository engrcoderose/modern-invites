# Standalone envelope opening preview

Route: `/opening-preview`. This is an opening animation study, not a client invitation.
No RSVP, backend, event record, or personal event content is connected.

The supplied reference shows a silver satin bow releasing, ivory gatefold panels
opening from the center, and a blue botanical invitation card coming forward.
The preview recreates those stages using CSS perspective and satin ribbon strips.
As a loop is fed through the knot, its measured centerline length transfers into
the free tail. Ribbon width stays intact outside the pinched knot area. The knot
cap turns aside while the strip beneath unfurls, then the wrap drops clear.
This is an authored ribbon model, not a full cloth simulation.

The sequence lasts about eight seconds and starts only on pointer or keyboard activation.
The 3.5-second ribbon release must finish before the paper animation starts;
completion callbacks coordinate the two phases rather than overlapping timers.
Repeated activation is guarded; completion transfers focus to the revealed title.
Reduced motion opens directly. Replay restores the cover and its button focus.
Refresh starts closed. The revealed text is generic preview copy.

The closed bow keeps the existing optimized photograph. During release, its actual
photographed loops travel into an occluded entrance beneath the knot, keeping their
original folds and highlights. The emerging tails and the opening knot use moving
texture coordinates sampled from that same satin photograph. Surface lighting only
slightly modulates those photographed details; it does not replace them with a flat
silver material. The renderer draws only when the ribbon or its frame changes.
Unsupported graphics uses a connected whole-ribbon fallback; image failure cannot
block opening.

Components, styles, and artwork are isolated in this folder. The page inherits
the repository's existing display/script font variables. No packages were added.

Generated assets use the built-in Imagegen tool, then are resized and saved as WebP:

- `assets/silver-satin-bow.webp`: transparent front-on silver-white satin bow,
  two loops, small knot, two fishtail tails, realistic silk sheen, no text or scene.
- `assets/blue-botanical-frame.webp`: antique cobalt botanical engraving on ivory,
  lush peonies and hydrangeas around a clear central panel with a fine gold rule.

The source video and extracted review frames remain local temporary review material;
they are not shipped by this route.

## Validation

- Targeted ESLint and isolated TypeScript checks passed.
- A geometry check verified 98 loop/tail samples conserve centerline length,
  free tails never shorten during the pull, and generated coordinates stay finite.
- The isolated Next.js production build passed with no real environment files,
  shared layout, middleware, or backend code copied into the preview app.
- Browser checks covered 390 × 844, 768 × 1024, and 1280 × 800 layouts;
  Enter/Space activation; repeated activation while disabled; replay focus;
  final heading focus; loaded responsive images; and console errors/warnings.
- The mobile opening was captured as painted frames through the final handoff.
  The photographic satin release is recorded in `outputs/opening-preview/opening-animation-v4.gif`.
  Captured mobile phase changes confirm the ribbon completes before paper motion;
  desktop recording confirms the final heading receives focus after the reveal.
- Reduced-motion handling was reviewed in code. Actual OS reduced-motion and
  iOS Safari behavior were not tested in the available browser.
- The isolated preview uses the repository's existing local script/serif fonts.
  The route in the main app inherits its existing Imperial Script/Instrument Serif
  font variables instead.

The local production preview is served at `http://127.0.0.1:4320/opening-preview`.
