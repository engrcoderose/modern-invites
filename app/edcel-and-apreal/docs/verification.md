# Draft verification

Checked locally on October 28, 2026. No real environment files were read or loaded. No Supabase access or admin changes were made.

## Isolated preview

The invitation was copied into the ignored `.next-preview-edcel-source` folder with only its frontend files, Tailwind/PostCSS configuration and shared base styles. The unrelated client-theme import was omitted from the preview stylesheet. The root layout used the exact Inter, Imperial Script, Libre Baskerville and Instrument Serif Latin fonts already present in the repository’s compiled font assets, loaded locally to avoid network font timeouts. This preview has no middleware, API routes, backend libraries or environment files.

Direct ESLint checks cover the new invitation. TypeScript passed in the isolated preview, followed by a successful production build. The initial repository-wide `tsc --noEmit --incremental false` check was blocked by stale `.next/types` references to missing `app/memories/[slug]/page` and `app/photo-sharing-preview/page` routes. Those unrelated generated files were left untouched.

## Browser checks

- Desktop 1440px, mobile 390px and tablet 768px layouts reviewed. Tablet hero artwork and mobile attire artwork were adjusted to keep names, dates and attire details clear.
- Keyboard and pointer opening, main-content visibility, focus handoff to the invitation title, and refresh returning to the cover checked.
- Document width stayed within each tested viewport. All in-page anchor targets existed. All rendered artwork loaded.
- FAQ disclosure opened and showed the confirmed 2:30 PM arrival / 3:00 PM ceremony timing.
- Empty required name blocked the preview and focused the name field. Invalid optional email blocked the preview and focused the email field.
- Both attendance choices reached the explicitly labeled nonpersisted preview. Edit restored the form with values intact and focused the name field.
- Production browser console returned no warnings or errors.

## Verification limits

- The calendar browser-download permission was declined. Download completion and calendar-app import were not verified, and no alternate download path was attempted.
- Reduced-motion handling is implemented for initial preference and preference changes during opening and text reveals. Native preference-switching and real-device Safari were not tested.
- Live RSVP submission, production event configuration, capacity/household rules, domain setup, client photography and music remain pending owner setup. Mock replies are not real RSVP responses.

Screenshots are retained under the ignored `.impeccable/review/edcel-and-apreal/` directory for development review. They are not deployed website assets.

## Independent finish review

Disposition: **ship** for the frontend draft. The reviewer inspected all ten final captures and the scoped implementation, with no material visual findings remaining. Static captures do not establish animation smoothness; the browser interaction checks and verification limits above remain the scope of the result. Source, CSS and artwork hashes matched the successful isolated production build. The temporary server was stopped and its generated checkout removed after verification.

## Supplied monogram revision

October 28, 2026: replaced typeset cover, navigation, seal and closing marks with optimized copies of the four user-supplied PNGs. Source mapping is in `assets/monograms/README.md`. Trimmed white margins and resized sources without redrawing their lettering; dark placements use CSS inversion and screen blending.

The scoped ESLint check, isolated TypeScript check and Next.js development compilation passed. Desktop 1440px and mobile 390px checks covered the opening, navigation and closing. The supplied marks loaded at responsive widths, the page had no horizontal overflow, and keyboard/pointer opening still handed focus to `ea-title`. Browser console errors and warnings were empty. This revision did not rerun the full production build or repeat backend/form tests; the earlier independent-review result applies to the original draft, with this asset revision checked separately. New screenshots are under `.impeccable/review/edcel-and-apreal/monograms/`.

## Ryan & Anne envelope revision

October 28, 2026: copied Ryan & Anne’s opening component, clip-path artwork, scoped CSS and unchanged lace image into this client, adapting client IDs, accessible labels and the existing E/A seal. A shared SVG color matrix tints the image layers burgundy; interior and underside colors match. The source project was left untouched.

Direct comparisons passed for timing constants, responsive sizes, flap path, 3:2 aspect, 170-degree rotation, backdrop, scene perspective/shadows, texture scaling, pocket shading and seal movement. The copied texture hashes match exactly. Inspected actual painted samples through a full opening, including the hinged flap, seal release, fade and handoff; the main page remained visually hidden until completion.

Final checks passed: scoped ESLint, isolated TypeScript and production build; desktop 1440 × 1000, mobile 390 × 844, short landscape 844 × 390; cached refresh; keyboard and pointer opening; rapid double activation; title focus and scroll restoration. The closed page dimensions equal the viewport, with no hidden-content scrollbar. Production browser console warnings/errors were empty. The initial sandboxed production build hit EPERM on generated chunks; the same credential-free isolated build succeeded outside the filesystem sandbox. Reduced-motion behavior is inherited from the source hook but was not browser-emulated; real-device Safari remains unverified. The noscript fallback was reviewed in source, not runtime-tested.

Screenshots and the painted-frame contact sheet are in `.impeccable/review/edcel-and-apreal/envelope/`. RSVP, calendar-download and backend limits above remain unchanged. The original full-draft review was not repeated for this targeted source-copy revision.

## Five-chapter love story and photo optimization

October 28, 2026: final user requirement is five chapters with one photo in each, preserving the source order. The pink studio portrait is explicitly third. The questionnaire story is split into a simple hello, choosing each other, growing in love, a beautiful yes, and the wedding promise; its confirmed facts are preserved.

All five sources were read from the supplied love-story folder and left untouched. Optimized WebP copies total 774,056 bytes versus 15,983,364 original bytes, a measured 95.2% reduction for these files. Images were autorotated and constrained to 1800px on either dimension without enlargement, encoded at source quality85, and stripped of capture metadata. Detailed measurements and source mapping are in `assets/photos/story/optimization.json` and that folder’s README.

Final scoped ESLint, isolated TypeScript/production build, and browser checks passed. At 1440px desktop, 768px tablet and 390px mobile, the DOM contains exactly five story articles and five loaded photographs in the requested order. Captures show intact framing and readable text, with no horizontal page overflow or console warnings/errors. Portraits retain their full aspect ratios; the studio photo’s rotation is corrected. Responsive widths and default optimizer quality are used; later photos remain lazy-loaded, and the shared image cache configuration was untouched.

An independent finish reviewer returned **ship** for this targeted story extension, with no material fixes. Final section crops and geometry/loading evidence are retained under `.impeccable/review/edcel-and-apreal/story/`. Source and live-integration verification limits elsewhere in this document remain in force; no backend or RSVP tests were repeated for this presentation-only change.
