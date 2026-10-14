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

## Slideshow transitions and flicker prevention

Apply these rules to hero slideshows and other invitation photo transitions:

- Prefer scoped CSS opacity transitions for photo crossfades. Keep the final
  opacity in the rendered styles. Do not depend on a Motion/WAAPI animation's
  temporary fill state: completion or cleanup can briefly restore opacity zero
  and reveal the outgoing photo for one frame. This occurred in Mario & Inah's
  hero slideshow even after loading and layer-order fixes.
- Keep the outgoing photo fully opaque beneath the incoming photo until the
  incoming fade has completed. Fading both layers out/in simultaneously can
  expose the background and create a brightness flash.
- Keep visited photo layers mounted in a stable order where practical. Load
  photos incrementally; this does not authorize preloading an entire gallery.
  Reset zoom effects only while the affected photo is fully hidden.
- Decode a new photo before revealing it. For a newly mounted cached image,
  establish its hidden starting style before switching to the visible state so
  the browser actually starts the CSS transition. Retain the current photo on
  loading/decoding failure and allow retry.
- Retire the outgoing layer only after the incoming opacity transition ends.
  Check the transition's target, property, and current slide; ignore unrelated
  or stale completion events. Handle reduced motion directly without waiting
  for a transition that was skipped. Rapid selections must not overlap fades.
- Verify cold and cached loads, multiple full autoplay loops (including the
  last-to-first transition), rapid selection, pause/resume, keyboard controls,
  reduced motion, and mobile/desktop layouts. Inspect the frames immediately
  before, during, and after completion; a static screenshot or opacity-coverage
  calculation alone cannot rule out an outgoing-photo flash.
- When a guest reports continued flicker, inspect their recording and reported
  URL/browser before claiming another fix. Frame-level checks should detect
  opacity reversals as well as exposed backgrounds. Distinguish checks of
  computed animation values from verification of the actual painted frames.

Use `app/mario-and-inah/components/HeroSlideshow.tsx` and its scoped
`slideshowSlide` CSS as a reference for the corrected crossfade behavior,
adapting image sizing, timing, and content to each invitation.

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

## New invitation project development guidelines

Apply the following guidelines when creating a new invitation website or client
folder. They supplement the conventions above. All backend integration work must
respect the private credentials and Supabase boundaries above.

### 1. Review Existing Invitation Projects First

Before creating or modifying an invitation website, inspect the existing invitation projects in the codebase. Understand how they are structured, designed, and implemented before making changes.

- Review existing invitation projects to understand their layouts, components, styling conventions, animations, interactions, and overall user experience.
- Identify reusable components, utilities, animation patterns, and established implementation approaches.
- Use existing projects as references for functionality and implementation, but do not blindly copy their designs.
- Adapt the design to the current couple's theme, color palette, event type, and visual references.
- Maintain consistency with the existing codebase while ensuring each invitation has its own identity.
- Reuse existing components when appropriate instead of creating unnecessary duplicates.
- Follow the project's established folder structure, naming conventions, coding standards, and technology stack.
- Before introducing a new dependency, font library, animation library, or architectural pattern, check whether the existing codebase already provides a suitable solution.

**Core rule:** Understand how existing projects work before implementing a new invitation. Use them as references for quality, functionality, and consistency while preserving the unique design of each project.

### 2. Invitation Opening Screen and Transition

The opening screen is an important part of the invitation experience. It should feel like an elegant introduction to the event rather than an ordinary website section.

#### Opening Screen Design

- Review existing invitation projects to understand how their opening screens and transitions are implemented.
- Create an intentional opening experience that matches the invitation's theme and visual direction.
- The opening screen may feature the couple's names, event date, decorative elements, background imagery, or a clear Open button, depending on the design.
- Keep the composition elegant, balanced, and responsive across mobile and desktop.
- Ensure the Open button is visually clear and easy to interact with.

#### Opening Transition Behavior

When the guest clicks the Open button, the invitation must transition smoothly into the main invitation experience.

- Create a polished transition that makes opening the invitation feel intentional and immersive.
- Consider elegant fade-outs, layered transitions, envelope-opening effects, subtle scaling, sliding elements, or other effects that suit the design.
- Coordinate the transition of the opening screen with the appearance of the main invitation content.
- Avoid abrupt content changes, flickering, awkward pauses, or unfinished animation states.
- Do not implement the opening screen as merely another section at the top of the page with a button that scrolls down to the next section.
- Do not rely solely on a basic scroll action to simulate opening the invitation. The transition should feel like the guest is entering the actual invitation experience.
- If scrolling or page movement is part of the design, incorporate it into a deliberate transition rather than making it the only opening effect.
- Ensure the opening screen does not remain interactive or block the main invitation after it has been opened.
- Prevent repeated clicks from triggering overlapping animations or leaving the interface in an inconsistent state.
- Ensure the transition behaves correctly when the guest revisits the page or refreshes it, following the intended experience of the project.

#### Animation Quality

- Use appropriate durations, easing curves, delays, and sequencing.
- Ensure the transition is smooth and visually consistent with the rest of the website.
- Avoid unnecessary animation complexity that negatively affects performance.
- Ensure the transition works on mobile and desktop.
- Respect reduced-motion preferences and provide an appropriate alternative when necessary.

**Expected result:** Clicking Open should create a seamless, elegant transition from the opening experience into the invitation itself, not simply move the guest to another page section.

### 3. Text Animations and Motion Design

Text animations should enhance the invitation's storytelling and visual appeal. They should feel intentional, elegant, and appropriate for the event's theme.

#### Text Animation Guidelines

- Inspect existing invitation projects to understand their text animation patterns and reuse suitable approaches.
- Apply text animations to appropriate elements, such as:
  - Couple names and prominent headings.
  - Opening messages and introductory text.
  - Section titles and subtitles.
  - Event details and important messages.
  - Entourage names and other relevant content.
- Choose animation styles that complement the overall design.
- Consider subtle fade-ins, staggered reveals, upward movement, letter-by-letter animations, word-by-word reveals, and other refined effects when appropriate.
- Use scroll-triggered animations when they improve the experience and help introduce content naturally as guests explore the invitation.
- Coordinate text animations with other visual elements when doing so improves the overall presentation.

#### Animation Timing and Behavior

- Use smooth easing, appropriate durations, and intentional delays.
- Establish a consistent animation language throughout the invitation.
- Vary animations when appropriate instead of applying the same effect to every text element.
- Avoid excessive movement, distracting effects, unnecessarily long delays, or animations that make guests wait to access important information.
- Ensure text remains readable and accessible during and after animation.
- Prevent text from remaining invisible if an animation fails or does not trigger.
- Avoid layout shifts, clipped text, horizontal overflow, and performance issues.
- Ensure animations behave correctly on both mobile and desktop.
- Avoid unnecessary repeated animations when guests scroll back and forth unless the design intentionally calls for them.
- Respect reduced-motion preferences and provide appropriate alternatives.

Use text animations to support the invitation's atmosphere and storytelling, not merely to add visual effects.

### 4. Typography and Font Selection

**Always use fancy, elegant, and visually expressive fonts for headings by default, unless the project requirements explicitly state otherwise.**

Prominent headings should feel thoughtfully designed rather than looking like ordinary default website text.

#### Heading Typography

- Use elegant, theme-appropriate display fonts for headings, section titles, and prominent invitation messages.
- Consider refined serif fonts, sophisticated display typefaces, calligraphy-inspired fonts, or decorative script fonts depending on the theme.
- Give special attention to the couple's names, as these are often the visual centerpiece of a wedding invitation.
- Select fonts based on the event's style, color palette, visual references, and overall design direction.
- For romantic or traditional invitations, consider elegant serif or script typography.
- For modern or minimalist invitations, consider refined editorial serif fonts or sophisticated display typefaces.
- For playful or whimsical invitations, choose expressive fonts that complement the theme without compromising readability.
- Do not automatically use the same decorative font across every invitation. Choose typography that suits the specific project.

#### Typography Pairing

- Pair expressive heading fonts with clean, readable body fonts.
- Maintain a clear hierarchy between headings, subtitles, descriptions, labels, and supporting information.
- Use appropriate font sizes, weights, line heights, letter spacing, and alignment.
- Ensure decorative typography remains readable on small screens.
- Avoid using elaborate script fonts for long paragraphs, form labels, instructions, or essential event information.
- Keep typography consistent throughout the invitation while allowing important elements, such as the couple's names, to have distinctive styling.

#### Font Implementation

- Inspect existing font configurations and available resources before introducing new fonts.
- Reuse existing font resources when suitable.
- Load fonts efficiently and avoid unnecessarily importing multiple font families or weights.
- Use appropriate fallbacks if a font cannot be loaded.
- Verify that the selected fonts render correctly across supported browsers and screen sizes.
- Ensure typography does not cause unwanted wrapping, clipping, overflow, or layout shifts.

Unless explicitly instructed otherwise, avoid plain default-looking fonts for prominent headings when a more elegant and theme-appropriate alternative is available.

### 5. RSVP Form Implementation

When implementing an RSVP form, inspect existing invitation projects and their RSVP forms before building a new one.

Use existing implementations as references for the form's structure, design, layout, functionality, and user experience.

#### Review Existing RSVP Implementations

Examine how existing RSVP forms handle:

- Form layout, spacing, typography, and visual styling.
- Guest names and household or invitation details.
- Attendance confirmation and attendance status.
- Number of attendees and accompanying guests, where applicable.
- Custom questions and conditional fields.
- Required fields and input validation.
- Error messages and helpful instructions.
- Submission, loading, success, and failure states.
- Confirmation messages after a successful submission.
- Responsive behavior on mobile and desktop.
- Data structures, API integrations, and admin-side functionality, where available.

Not every invitation needs all these features. Implement only what the current project requires.

#### Design and Functionality

- Match the RSVP form's design to the current invitation's visual theme.
- Reuse existing form components and interaction patterns where appropriate.
- Maintain consistent styling for inputs, buttons, labels, dropdowns, checkboxes, radio buttons, and other form controls.
- Ensure the form is easy to understand and complete on mobile devices.
- Provide clear validation and helpful feedback when required information is missing or invalid.
- Include appropriate loading, success, and error states.
- Prevent accidental duplicate submissions.
- Preserve existing RSVP functionality when modifying or reusing components.
- Ensure forms are accessible through appropriate labels, keyboard interactions, and focus states.

#### RSVP Data and Integration

- Inspect existing RSVP data structures and API patterns before implementing integrations.
- Follow the existing project's approach to data handling and submission.
- Do not invent API endpoints, database fields, or backend functionality.
- Do not assume a frontend form is fully functional simply because it looks correct.
- If the backend integration is available and appropriate, connect the form using the established implementation patterns.
- If backend integration is not yet available, build the frontend interface first and clearly identify what remains to be connected.

**Core rule:** Use existing RSVP forms as implementation references while adapting their design and fields to the current invitation's requirements.

### 6. RSVP Forms Without an Existing Admin-Side Record

Sometimes a new invitation website will not yet have an associated record or configuration in the admin side.

In this situation, **implement the invitation and RSVP frontend first. The user will add the necessary admin-side record after the draft has been finalized.**

#### Frontend-First Workflow

- Build the invitation layout and RSVP interface based on the available requirements.
- Follow existing RSVP form patterns, components, and styling conventions.
- Implement the intended frontend interactions, validation, responsive layout, and user feedback.
- Use temporary mock data or placeholders only when needed to develop or demonstrate the interface.
- Keep the code structured so the form can be connected to the actual backend or admin configuration later.
- Separate presentation logic from data access and submission logic when appropriate.
- Reuse established services, hooks, utilities, and API abstractions if they are already available.

#### Admin-Side Restrictions

- Do not create an admin-side invitation record solely to make the frontend work.
- Do not invent or hardcode database identifiers, invitation IDs, or production configuration values.
- Do not modify unrelated admin settings, database schemas, or existing invitation records.
- Do not introduce unnecessary backend changes just to support a draft.
- Do not present mock submissions as real, persisted RSVP responses.
- Clearly distinguish temporary frontend behavior from functionality that requires backend integration.

#### Preparing for Final Integration

- Keep any pending integration points clear and easy to locate.
- Document the expected data or configuration needed to connect the form when necessary.
- Ensure the frontend can be connected to the eventual admin-side record without requiring a major rewrite.
- Preserve the intended RSVP fields and behavior so the finalized design can be integrated smoothly.

Once the invitation draft is finalized and the admin-side record is available, integrate the form using the project's established data-handling patterns.

**Important:** Do not block frontend development just because the admin-side record does not exist yet. Complete the draft first, keep the implementation integration-ready, and leave record creation to the user.

### 7. General Development and Quality Standards

All invitation projects should be elegant, responsive, maintainable, accessible, and production-ready.

#### Code Quality

- Inspect the existing codebase before making changes.
- Follow established architecture, folder structure, naming conventions, and coding standards.
- Prefer reusable components and clear separation of responsibilities.
- Avoid unnecessary code duplication, overly complex implementations, and unnecessary dependencies.
- Use descriptive names and keep components readable and maintainable.
- Preserve existing functionality unless a change is explicitly required.
- Avoid unrelated refactoring that increases the risk of regressions.
- Do not replace existing implementations without understanding their purpose and dependencies.

#### Responsive Design

- Prioritize a polished mobile experience, as many guests will open invitations on their phones.
- Ensure the layout adapts correctly to mobile, tablet, and desktop screens.
- Check typography, image cropping, spacing, navigation, animations, and form controls at different viewport sizes.
- Prevent horizontal scrolling, clipped content, overlapping elements, and broken layouts.
- Ensure interactive elements are easy to tap on mobile devices.

#### Accessibility and Performance

- Use semantic HTML and appropriate accessibility attributes.
- Maintain sufficient color contrast and readable text sizes.
- Support keyboard navigation and visible focus states for interactive elements.
- Respect reduced-motion preferences.
- Optimize images, fonts, and animation effects.
- Avoid unnecessary rendering work and expensive animation techniques.
- Ensure important content remains accessible even if decorative effects fail.

#### Visual Quality Assurance

Before considering an invitation draft complete:

- Compare the implementation with the intended design references.
- Review the opening-screen transition.
- Check heading fonts and typography hierarchy.
- Verify text animations and scroll-triggered effects.
- Test RSVP fields, validation, and interface states.
- Confirm that unavailable backend or admin integrations are clearly identified.
- Review the entire page on mobile and desktop.
- Check for console errors, broken assets, layout issues, and unintended regressions.
- Verify that the final experience feels cohesive rather than like a collection of unrelated sections.

### 8. Final Guiding Principles

Every invitation project should follow these principles:

1. **Inspect before implementing.** Learn from existing projects and established code patterns before making changes.
2. **Prioritize the guest experience.** The invitation should feel intuitive, immersive, and easy to navigate.
3. **Make the opening memorable.** The Open button should lead to a deliberate, elegant transition rather than a basic scroll to another section.
4. **Use expressive typography.** Choose fancy, elegant heading fonts by default unless the project specifies otherwise.
5. **Animate with intention.** Use polished text animations and motion effects that support the theme without distracting from the content.
6. **Reuse established RSVP patterns.** Follow existing implementations for layout, behavior, validation, and integration.
7. **Develop the frontend first when necessary.** If an admin-side record does not yet exist, complete the draft and prepare it for later integration instead of inventing backend records.
8. **Preserve each project's identity.** Reuse implementation patterns without making every invitation look the same.
9. **Prioritize quality over unnecessary complexity.** Keep the implementation clean, responsive, accessible, performant, and maintainable.
10. **Verify before finishing.** Review the entire invitation and test its important interactions before considering the work complete.

The ultimate goal is to create beautiful, personalized, premium-feeling digital invitations with elegant typography, meaningful animations, reliable RSVP experiences, and clean, maintainable code.

## Invitation opening screens and transitions

Apply these guidelines when creating or modifying invitation websites. Preserve
each invitation's visual identity; reuse the principles rather than copying a
specific design, asset geometry, or animation duration.

### Prevent overlapping content and duplicate artwork

- Treat the opening cover and main invitation as separate visual states. Keep
  the main invitation visually hidden and non-interactive until the cover's
  handoff is complete. `inert` and `aria-hidden` alone do not hide pixels.
- When destination measurements are needed, keep the hidden invitation mounted
  with layout preserved, for example using `visibility: hidden` rather than
  `display: none`.
- Give the cover an opaque backing that matches the destination surface. Its
  background can fade while the foreground moves without exposing page text,
  navigation, or a second logo underneath.
- For a logo morph, align the outgoing and incoming artwork within one moving
  wrapper in the cover. Crossfade there, then hand off to the stationary page
  logo. Never expose two independently positioned or moving copies at once.
- Measure the destination after critical fonts and artwork layout are ready.
  Account for transparent padding, aspect ratio, and transform origin. Do not
  copy another invitation's pixel offsets or artwork percentages without checking.
- Exclude the destination logo from the initial text stagger or translation so
  it does not jump or animate again at handoff. Reveal text and controls afterward.

### Prevent loading flashes and animation glitches

- Reserve image dimensions and coordinate the initial cover reveal with critical
  image decoding/loading and font readiness. Prioritize only immediately needed
  assets. Provide failure fallbacks so loading cannot permanently block Open.
- Establish initial visibility before the first paint and on refresh. Do not
  briefly render the main page and hide it afterward in an effect.
- Persist final animation values in rendered styles. Do not rely solely on a
  completed animation's temporary fill state: cancellation or cleanup can expose
  its initial value and cause a one-frame flash. Use the existing animation
  library's motion values or explicitly retain the final styles when necessary.
- Give each animated property a clear owner. Avoid accidental compounded fades,
  conflicting CSS/JavaScript transforms, and cleanup that resets visible content.
- Coordinate background fading, foreground movement, and artwork crossfading as
  separate layers when needed. Slowing every animation does not fix bad sequencing.
- Use animation completion to trigger the handoff, not an unrelated early timer.
  Ensure all required outgoing layers have finished before removing the cover.
  Keep callbacks stable so ordinary renders do not restart the sequence.
- Guard repeated clicks and keypresses. Keep focus in the cover while opening,
  then move focus into the invitation and remove the overlay's interaction block.
- Respect reduced motion with a short fade or immediate handoff that reaches the
  same usable state. Never wait for completion of an animation that was skipped.

### Verify the entire opening sequence

- Check cold and cached loads, refresh, idle-before-click, pointer and keyboard
  activation, repeated activation, and image/font failure behavior.
- Inspect intermediate frames as well as the final page: initial reveal,
  movement, background fade, artwork crossfade, handoff, and text/control reveal.
- Verify mobile, tablet, desktop, and reduced-motion behavior. Check iOS Safari
  when available; desktop viewport emulation is not Safari verification.
- Look for ghosted or duplicated artwork, premature page content, opacity snaps,
  layout/scrollbar shifts, blank pauses, clipped elements, invisible final text,
  leftover overlays, and lost keyboard focus.
- Use isolated frontend checks within the project's credential and backend
  access rules. State any checks that could not be run rather than claiming them.
