# Invitation project conventions

Apply these user preferences when creating or updating invitation projects in
this repository:

- Use Tailwind utilities in JSX for simple layout: flex/grid, alignment, gaps,
  spacing, sizing, positioning, and ordinary responsive adjustments.
- Use scoped custom CSS for complex layouts, decorative artwork and shapes,
  pseudo-elements, layered backgrounds, typography/font definitions, and
  animations. Keep animation logic in the existing animation library when useful.
- Avoid competing utility and CSS declarations for the same simple layout rule.
  Do not add CSS classes or `@apply` wrappers solely to hide basic utilities.
- Keep components readable, extract repeated UI when it improves clarity, and
  remove obsolete selectors and superseded overrides during refactors.
- Preserve confirmed event content, design, accessibility, and navigation unless
  a change is requested. Check affected desktop/mobile layouts after styling work.
- Carry this Tailwind-first convention into each new invitation created here.

When creating a NEW invitation website/client folder:

- Follow the repository's existing architecture and conventions before introducing
  new patterns. Inspect similar existing invitation projects first and reuse
  established patterns where appropriate.
- Keep each client's invitation isolated in its own dedicated folder. Do not
  place client-specific components, assets, styles, data, or configuration in
  shared/global locations unless they are genuinely reusable.
- Organize files by responsibility. Keep components, sections, data/configuration,
  assets, styles, utilities, and other file types in appropriate folders instead
  of placing everything in one directory.
- Keep files small and focused. Do not create unnecessarily long files containing
  multiple unrelated components, large data objects, styling, and business logic.
  Split large files into smaller logical components when they become difficult to
  read or maintain.
- Avoid monolithic components. A page should primarily compose sections and
  components rather than contain the entire invitation implementation in one file.
- Extract repeated or reusable UI into components. Avoid premature abstraction for
  one-off elements that are unlikely to be reused.
- Separate content/data from presentation whenever practical. Event details such
  as names, dates, venues, entourage, FAQs, galleries, RSVP configuration, and
  other client-specific information should not be unnecessarily hardcoded across
  multiple components.
- Prefer configuration/data-driven rendering for repeated content such as
  entourage members, event details, galleries, timeline items, FAQs, and gift
  options instead of duplicating JSX.
- Keep client-specific content easy to locate and update without requiring changes
  across many unrelated files.
- Use clear, descriptive, consistent file and folder names. Follow the naming
  conventions already established by the repository.
- Do not duplicate existing components, utilities, hooks, or functionality when an
  appropriate reusable implementation already exists. Reuse existing abstractions
  when they fit the new invitation.
- Avoid unnecessary dependencies. Do not install a package when the requirement
  can be reasonably handled using existing project dependencies or simple native
  functionality.
- Do not introduce global styles, global variables, or global selectors for
  client-specific requirements. Scope client-specific styling to the relevant
  invitation/project.
- Keep CSS and styling predictable. Avoid excessive specificity, `!important`,
  deeply nested selectors, and override chains. Remove obsolete styles when
  replacing an implementation.
- Keep JavaScript/TypeScript logic maintainable. Avoid deeply nested conditionals,
  duplicated logic, magic numbers, unexplained constants, and unnecessarily
  complex state management.
- Prefer existing types and shared interfaces where available. Avoid `any` unless
  there is a documented and unavoidable reason to use it.
- Keep accessibility in mind from the beginning. Use semantic HTML, meaningful
  labels, keyboard-accessible interactions, appropriate button/link elements,
  alt text for meaningful images, and sensible focus states.
- Optimize images and assets appropriately. Use suitable dimensions, formats, and
  loading strategies. Do not duplicate the same asset unnecessarily.
- Do not hardcode environment-specific values, secrets, API keys, credentials, or
  other sensitive information into invitation files.
- Keep secrets and private configuration out of source control and follow the
  repository's existing environment-variable conventions.
- Build mobile-first and verify responsive behavior across common mobile,
  tablet, and desktop breakpoints.
- Avoid fixed dimensions that can unnecessarily break on smaller screens. Prefer
  flexible layouts and responsive sizing unless a fixed dimension is required by
  the design.
- Preserve performance. Avoid unnecessary re-renders, excessive animation,
  oversized assets, unnecessary client-side state, and expensive operations during
  initial page load.
- Make animations graceful and non-blocking. Respect `prefers-reduced-motion`
  where appropriate and avoid animations that interfere with navigation,
  readability, or accessibility.
- Keep the implementation future-proof. Prefer patterns that allow additional
  sections, event details, galleries, RSVP fields, themes, or features to be
  added without rewriting the entire invitation.
- Avoid tightly coupling unrelated sections. Changes to one invitation section
  should not unnecessarily affect other sections.
- Do not modify shared/global functionality solely to solve a client-specific
  requirement unless the change is intentionally designed to support all
  invitations and existing projects remain compatible.
- Before finishing a new invitation, check for unused imports, dead code,
  duplicate styles, duplicated components, console errors, broken links,
  missing assets, incorrect responsive behavior, and unnecessary dependencies.
- Run the repository's available linting, type-checking, formatting, and build
  checks when applicable. Fix issues introduced by the new invitation before
  considering the implementation complete.
- Do not make unrelated refactors while creating a new client invitation.
  Keep changes scoped to the requested client/project unless a shared change is
  necessary and clearly justified.
- Follow existing project conventions over personal preference. If an existing
  repository pattern is inconsistent but still functional, do not rewrite the
  entire architecture just to introduce a new pattern for one invitation.
- When uncertain, prioritize readability, maintainability, consistency,
  accessibility, performance, and ease of future client revisions over writing
  the fewest possible lines of code.

## Image optimization and Vercel usage

Apply these rules across the repository when creating or updating invitations,
including projects copied from an existing client or template:

- Prefer the existing `next/image` optimizer and its responsive width selection.
  Do not copy custom loaders that force a minimum 1920px/full-HD image on every
  screen. Use larger versions only when the displayed size, crop, or pixel density
  requires them.
- Use accurate `sizes` values for responsive and `fill` images. Match the actual
  mobile/tablet/desktop frame, including height limits and `object-cover` cropping,
  so smaller screens can request smaller images without losing subject detail.
- Keep the default image quality for ordinary images. Start photo slideshows at
  quality 85 rather than 95 or 100; adjust only when visual checks or an explicit
  client requirement justify it. Avoid unnecessary quality/format variants.
  Reuse qualities already permitted in the shared `images.qualities` allowlist.
  If another quality is necessary, update the allowlist deliberately and preserve
  values used by existing invitations and the default quality.
- When a slideshow uses the same photo for its foreground and blurred backdrop,
  reuse one optimized image version where visual checks confirm it is sufficient.
  Avoid generating a separate full-screen variant solely for a blurred layer.
- Preserve the shared `images.minimumCacheTTL` of 31 days
  (`31 * 24 * 60 * 60`) for stable invitation images. Do not shorten it for a new
  client without a concrete freshness requirement. This is image caching only;
  do not apply it to RSVP, authentication, guest data, or other dynamic responses.
- Prefer static imports for local artwork/photos so changes receive content-hashed
  URLs. When replacing public or remote images, change their filenames or version
  URLs and update matching `remotePatterns` restrictions when necessary. Keep URLs
  stable until the asset changes; do not add timestamps or new versions on every
  render or deployment.
- Resize/compress source assets appropriately and preserve transparency where
  needed. Use `unoptimized` selectively for small, already optimized assets or
  formats that do not benefit from the optimizer; do not enable it for every image
  merely to reduce optimization counters, since large originals can increase
  bandwidth and slow loading.
- Prioritize only immediately visible images. Use lazy loading for later content
  where appropriate, and avoid eagerly fetching entire hidden galleries or
  slideshows unless required for smooth playback. Preserve working preload,
  fallback, keyboard, and reduced-motion behavior when changing loading strategies.
- Verify photo sharpness, crop/focal points, image loading, selected responsive
  widths, and layout at common mobile, tablet, and desktop sizes. Run applicable
  lint, type, and build checks within the private-credential boundaries below.
  Treat measured file-size reductions as samples, not guaranteed account-wide
  savings; deployed changes affect future usage and new variants need initial
  processing.

## Private credentials and Supabase boundaries

- Treat `.env.local` and other real environment or credential files as private.
  Do not read, display, search their contents, source, load, or use them. Exclude
  them from repository searches. Sanitized example files such as `.env.example`
  may be used for configuration guidance.
- Do not access the user's Supabase project, including read-only queries,
  verification calls, SQL execution, migrations, or data changes. Do not use
  credentials through scripts, SDKs, CLIs, browser sessions, or other tools to
  bypass this boundary.
- For Supabase work, prepare a reviewable SQL script or instructions for the
  user to run manually. Explain its scope and provide any verification queries
  for the user to run as well. Never execute it yourself.
- A request to fix an issue or reset a passcode, or the user supplying a new
  passcode, does not authorize credential access or remote execution. Tool
  availability and filesystem or sandbox permissions are not user consent.
- Avoid commands that automatically load private environment files or connect
  to Supabase. Use isolated local checks with synthetic data and placeholder
  credentials; if a check requires private credentials or Supabase access,
  leave it for the user and state that it was not run.
- These boundaries remain in force unless the user explicitly changes them
  for a specific action. Do not infer an exception from a general task request.
