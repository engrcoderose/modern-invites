# Edcel & Apreal

Public URL: `https://edcelandaprealwedding.moderninvites.com/`. This client uses the repository's existing Next.js, Tailwind, Motion and Lucide dependencies, the supplied New Icon Script font and root Playfair Display font.

Only `/` on that exact hostname rewrites internally to `/edcel-and-apreal`, preserving query parameters. Direct requests to the old `/edcel-and-apreal` page return HTTP 404 on all deployed hosts, including the main domain, deployment previews and the new subdomain. The page remains available on `localhost`, `127.0.0.1` and `[::1]` for local development and production previews. Media and API paths are excluded from this page-only restriction. The dashboard invitation link and canonical URL use the new domain; the RSVP event slug, guest records and media URLs remain unchanged. Deploy the routing changes to activate this behavior after the owner's Vercel/DNS setup.

## Structure

- `page.tsx`: section order.
- `components/` and `sections/`: invitation UI, envelope, galleries, timeline, film, music and RSVP.
- `hooks/`: slideshow, text reveals and background-music coordination.
- `styles/`: scoped typography, responsive layouts, artwork and animations.
- `data/`: confirmed event content, entourage, five story chapters, attire, gifts, navigation and media configuration.
- `assets/`: active artwork, font and supporting source/optimization records.
- `AGENTS.md`: project conventions and confirmed content constraints.

## Confirmed design and content

The current wine, burgundy, old-rose and blush theme is documented in [DESIGN.md](DESIGN.md). All client theme variables are scoped to this invitation. The dress-code copy, original nine swatches and outfit illustrations are preserved; the separately requested attire background is `#4B0F1F`.

The five love-story chapters retain the supplied photo order: First, Second, Third (pink studio), Fourth (beach), Last (save the date). Content lives in `data/story.ts`. Event details, timetable and deadline live in `data/wedding.ts`; sponsor names live in `data/entourage.ts`.

## Opening, film and music

The 2.8-second layered lace-envelope opening reveals the invitation only at handoff. It retains keyboard focus handling, repeated-click protection and reduced-motion behavior.

The real Save the Date film streams from [R2](https://assets.moderninvites.com/edcel-and-apreal/prenup/save-the-date-1080p-07f4f465.mp4). `data/prenup-film.ts` owns its URL, title and poster. The retained local export is in `public/edcel-and-apreal/video/`. The 97.3 MB file preserves the full duration, original frame rate and unchanged audio; source and quality measurements are in [assets/video/README.md](assets/video/README.md) and [optimization.json](assets/video/optimization.json).

The film defaults to unmuted. Open requests then immediately pauses playback on the same video element; playback is attempted after the envelope handoff. No source is assigned before Open. Browser policy can still require the Play button. Native controls and inline playback remain available. Reduced motion keeps playback manual. Continuing, scrolling away or hiding the tab pauses the film.

Tablet layouts fit the lace frame around the uncropped film over burgundy; phone and desktop retain their existing artwork compositions.

The active playlist in `data/music.ts` is Iris (Jada Facer acoustic cover), Can't Help Falling in Love, Until I Found You. The first track is `iris-jada-facer-b2861c80.mp3`, an unchanged 3,982,509-byte copy of the owner's supplied MP3, lasting 165.888 seconds. Runtime MP3s are in `public/edcel-and-apreal/music/`. Starting the film pauses background music; Continue starts music and pauses the film. Manual pause, volume, playlist controls and track wrapping remain in the existing music hook.

## Photos and artwork

Prenup and story photo metadata and R2 URLs live in `data/photo-media.json`, typed through `data/photo-media.ts`. The sofa-embrace slideshow replacement remains a local static import. Hero, gallery, timeline and photo-break selections live in their respective data files.

Keep active artwork, font files, source proportions, transparency, responsive image sizes and crop focal points intact. The gift QR PNGs retain their original white quiet zones and download links.

Photo crossfades, text reveals, countdown flowers, decorative parallax, timeline motion and reduced-motion alternatives remain in the existing components, hooks and scoped CSS.

## RSVP and verification

The confirmed event slug `edcel-and-apreal` connects the existing shared SmartRsvpFlow. The backend supplies invitation access, guest records, household capacity, deadlines and response rules. This client does not invent database identifiers or create event records.

Never load real environment files, credentials or Supabase for checks. Use an isolated frontend copy with synthetic RSVP data. Run appropriate scoped lint, TypeScript and isolated production-build checks. Real iOS Safari and live RSVP verification require separate checks within the repository's access boundaries.

Domain regressions are covered by `tests/invitation-domains.test.mts`, `tests/invitation-route-access.test.mts` and `tests/client-dashboard.test.mts`. The middleware tests use synthetic environments and replace the auth import before execution, preventing backend access. The isolated production check verifies the public root, retired-path 404s, localhost access, canonical metadata and unchanged API/media routing.

The November 2 cleanup removed unused media, generation instructions and old agent review records. Active application files, animation styles, content data and runtime media were preserved without modification.
