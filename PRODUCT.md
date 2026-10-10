# Modern Invites

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Event guests use a client's invitation to understand the celebration, find event details, and submit an RSVP when that invitation enables it. Some events also offer a seat finder.
- Clients use their assigned dashboards to manage guest responses, guest lists, and the event services included for them.
- Modern Invites staff administer client access, event assignments, and event services through the admin tools.

All three audiences belong in the product context. Feature availability and access depend on the specific event and user role.

## Product Purpose

Modern Invites provides personalized invitation websites for celebrations, supported by guest and event management tools. Guests should be able to understand the event and complete its enabled actions; clients and staff should be able to organize the corresponding information within their permitted access.

The marketing website presents the service, sample invitations, and inquiry paths. Existing marketing content also offers print-ready invitation designs; do not expand those claims without confirmation.

## Operating Context

- This is an existing Next.js App Router repository using React, TypeScript, Tailwind CSS, and established UI and animation dependencies.
- Client invitations live in dedicated folders under `app/`, with different themes, assets, content, and feature configurations.
- The shared marketing website and client/admin tools are separate surfaces. Their styling must not become a compulsory theme for client invitations.
- Client-specific README files, data/configuration, assets, implementation, and applicable nested instructions provide the context for work on each invitation.
- RSVP and seat-finder flows differ by event. A feature present elsewhere in the repository is not evidence that it is enabled or approved for another client.

## Capabilities and Constraints

### Scope and content

- Follow the root `AGENTS.md` and applicable client-specific instructions.
- Preserve confirmed event content, artwork, navigation, accessibility, and RSVP behavior unless the user requests a change.
- Preserve each client's established design. Do not impose one visual theme across all clients.
- Keep client-specific components, sections, data/configuration, assets, styles, and utilities in that client's folder. Reuse established shared abstractions when they fit; avoid unrelated refactors and unnecessary dependencies.
- Keep repeated content data-driven and easy to update. Pages should compose focused sections rather than contain a monolithic implementation.
- Treat draft or missing client information as pending. Do not invent names, dates, venues, photographs, claims, or feature availability.

### Implementation and verification

- Use Tailwind utilities in JSX for simple layout and responsive adjustments. Use scoped CSS for decorative artwork, complex layouts, typography definitions, layered backgrounds, and animations; avoid competing declarations.
- Build mobile-first and verify affected mobile, tablet, and desktop layouts. Preserve graceful motion and reduced-motion behavior.
- Follow the image optimization conventions in `AGENTS.md`, including accurate responsive sizes, selective priority loading, existing allowed qualities, and the shared 31-day image cache TTL. Do not apply image caching rules to dynamic guest or authentication data.
- Run checks appropriate to the change within the private-credential boundaries. Do not assume a repository dev/build command is safe: Next.js automatically loads private environment files. Use isolated checks with synthetic data and placeholder configuration when necessary.

### Private credentials and Supabase

- Do not read, display, search, source, load, or use private environment or credential files, including `.env.local`. Exclude them from searches and isolated previews. Sanitized example files may provide configuration guidance.
- Do not access the user's Supabase project, including read-only queries, verification, SQL execution, migrations, or data changes through any tool or session.
- Prepare reviewable SQL and verification instructions for the user to run manually when database work is requested. A general fix request does not authorize remote execution or credential access.
- These boundaries change only through explicit user authorization for a specific action. Record any checks left for the user rather than claiming they passed.

## Brand Commitments

The service name is Modern Invites. Each client's confirmed theme, artwork, licensed assets, and content remain authoritative for that invitation. Refinement preserves that identity; a replacement visual direction requires a request to redesign.

There is no repository-wide invitation palette, font pairing, or decorative style prescribed by this product record.

## Evidence on Hand

- `AGENTS.md`: repository architecture, styling, accessibility, image, and private-credential conventions.
- `package.json`: existing dependencies and available scripts.
- `app/page.tsx` and `components/landing/`: current marketing surfaces and service descriptions.
- Client folders under `app/`, including `app/jaydee-and-bea/`: invitation implementations, content, assets, and client documentation. Check current code and data against older README notes before treating them as current facts.
- `app/client-login/`, `app/dashboard/`, `app/admin/`, and `features/`: source evidence for client and staff workflows; implementation presence does not verify live service status.
- `app/seat-finder/`: event-specific seat-finder surfaces.

Client approval status, pending content, and enabled services must be checked for the target invitation. No customer claims, testimonials, or operating guarantees are established by this initialization.

## Product Principles

1. Preserve the client's confirmed event truth and individual identity.
2. Make guest actions clear and client/staff operations understandable within their assigned scope.
3. Keep client work isolated, maintainable, and consistent with existing repository conventions.
4. Balance visual craft with accessibility, responsiveness, and performance.
5. Respect private credentials and remote-data boundaries throughout implementation and verification.

## Accessibility & Inclusion

Follow the repository's existing accessibility requirements: semantic HTML, meaningful labels and image alternatives, keyboard-accessible interactions, sensible focus states, and reduced-motion support. Check readability, contrast, and navigation across relevant device sizes. No additional product-specific accessibility standard or audience requirement has been confirmed.
