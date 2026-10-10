# Jaydee and Bea RSVP

Mode: Operate. Local section redesign within the established floral invitation; code-led, no new visual identity or approved comp.

User: “make it simple but elegant like the leslie and serj invitation but floral theme.” Preserve supplied fonts, confirmed copy, null deadline, null RSVP URL and “RSVP opens soon.” No Supabase access or private credential loading.

Latest user correction: “the rsvp should be a form like this,” with mobile and desktop screenshots. This supersedes the framed reply panel. Follow the supplied form hierarchy and responsive photograph placement while retaining the floral identity. `rsvp.eventSlug` remains null; the prepared shared flow does not establish live backend availability.

## Direction contract

THESIS: A name-search form following the user's mobile and desktop screenshots. Replace the prior framed reply panel with a direct underlined field and full-width search action.

OWN-WORLD: Ivory ground, muted sage ink, pale petal texture and faint rose corners. Imperial Script heading; local JB Noto Serif details. Existing couple photo beside the desktop form.

STORY: Guests recognize the Full Name field and Find My Invitation action. Null eventSlug retains the honest RSVP opens soon state without network requests. Once an actual event slug is configured, the established shared name-search and party-response flow handles guest lookup and replies.

FIRST VIEWPORT: On desktop an existing landscape photo occupies the left column, with a large script heading, lookup instruction, Full Name label, helper, underlined input and wide action on the right. Mobile hides the photograph and shows the form alone. Floral artwork recedes to the outer edges, with no box around the form. Never copy the screenshot's unconfirmed November deadline.

FORM: User-pinned screenshots translated into the existing floral world; no concept seed for this precisely specified local section. Signature interaction is invitation lookup using shared SmartRsvpFlow when configured. Pending form remains editable and explicitly unavailable for submission.

Motion update: The user requested falling petals in the supplied six pastel colors. A slow staggered drift expresses the floral invitation, with twelve small CSS petals on desktop and six on mobile. Transform/opacity only, no new image assets. Following the scope correction, one fixed layer extends across the whole invitation after opening, beneath navigation. It never intercepts controls; motion pauses while editing or in a hidden tab, and is omitted for reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Existing system documentation is preserved because this is a local extension; all artwork is reused from user-supplied assets, with no new raster creation.

## Form finish evidence

Disposition: SHIP. Independent finish review read both user references, all five final captures, and source, with no material fixes. The isolated production build passed compilation, ESLint, and TypeScript checks (70.2 kB route / 173 kB first-load JS). Browser checks at 320 × 812, 390 × 844, 768 × 1024, 1280 × 720, and 1440 × 900 confirmed no document overflow, loaded responsive images and expected selected sources, supplied fonts, and label/helper/status relationships. Synthetic Test Guest input stayed editable, Enter could not submit, and keyboard focus remained visible. No console warnings or errors were recorded. Reduced-motion handling was reviewed in CSS without physical emulation; no animation was introduced.

Captures: `.impeccable/review/jaydee-rsvp-form/{narrow-mobile,mobile,tablet,user-1280,desktop}.png`. Native captures uniformly scale by the scrollbar width; actual browser viewport dimensions were confirmed. The current design and configuration are documented in `app/jaydee-and-bea/README.md`. Shared SmartRsvpFlow loads only when an event slug is configured; with the current null value there are no initial lookup requests and live lookup/household responses remain unverified. The deadline stays null, and the reference's November date is unused. No assets were added. Root `DESIGN.md` remains a pre-existing documentation gap; this local extension creates no identity or token sidecar. No private environment files or Supabase access were used.

## Previous panel review (superseded by the user's form request)

Disposition: SHIP after source review and five viewport reviews (320 × 812, 390 × 844, 768 × 1024, 1280 × 720, 1440 × 900). The isolated production build passed compilation, ESLint, and TypeScript checks. Responsive artwork loaded, supplied fonts and the disabled pending action were confirmed, and no document overflow or console warnings/errors were observed. Reduced-motion CSS was reviewed without physical emulation; the RSVP adds no animation. Captures: `.impeccable/review/jaydee-rsvp/{narrow-mobile,mobile,tablet,user-1280,desktop}.png`.

Current treatment and verification are recorded in `app/jaydee-and-bea/README.md`; superseded RSVP text/entrance animation notes were corrected there. Root `DESIGN.md` was absent before this local extension and remains an existing documentation gap; no new identity, global design record, or token sidecar was created. Existing artwork provenance is retained. No private environment files or Supabase access were used.
