---
version: 1
slug: "app-portfolio-page-tsx"
primary_target: "app/portfolio/page.tsx"
related_targets: ["lib/portfolio.ts","components/portfolio/InvitationCard.tsx"]
---

# Portfolio invitations

Scope: app/portfolio/page.tsx, lib/portfolio.ts, components/portfolio/InvitationCard.tsx. Visitor mode: Experience.

The user explicitly requested invitation cards and recent works on both the homepage and Portfolio page. Extend the established Portfolio composition, keeping wedding and other invitation groups, section navigation, seat-finder demonstration, and inquiry paths. Reuse one typed collection. Ryan & Anne is visible again at the user's request, using its existing photos and final invitation link. Jaydee & Bea and Anjo & Jasmin remain hidden because they are not finalized; retain their catalog entries with `hidden: true` and filter them from the shared public list before rendering, counting, or preloading. Leslie & Serj remains excluded. Preserve the invitation routes for ongoing work.

One column on mobile and two from 640px, retaining two on desktop. First-card image priority on mobile; only the second card preloads from 640px to match the visible first row. Responsive image sizes match the columns and gutters. Later cards stay lazy. Respect reduced motion and keyboard focus. No client invitation, environment, API or remote database changes.

User-confirmed package metadata: Ryan & Anne and Jaydee & Bea are Signature; Anjo & Jasmin is Luxury. Retain these badges, including on hidden entries for when their cards are made visible.

Vincent & Gabrielle is a Signature Bundle; use that exact badge in both galleries.

Nylgen & Kersee is a Classic Bundle; show that badge alongside Botanical and Ivory & Sage in both galleries.

Mario & Inah is the newest visible entry in the shared portfolio and homepage recent invitations. Reuse their existing portrait assets and pastel garden palette, linking directly to `https://marioandinahwedding.moderninvites.com`; the internal `/mario-and-inah` path is not a public entry point. No package tier has been confirmed for its badge.

Shared motif update (2026-11-23): the user-approved lavender palette now applies to Portfolio and the other five public marketing routes. Use the supplied shared gradient for the introduction, white/pale-lavender section grounds, Brand 700/800 navigation and actions, Marketing Ink headings, and solid Marketing Muted supporting copy (#412c4b). This earlier color-only pass preserved the incumbent hierarchy and geometry; the elegance update below now governs their approved replacement. Preserve client artwork and local sample accents, section groups, destinations, and seat-finder demonstration. The portfolio social card uses lavender-envelope.png with the existing envelope geometry and brand tokens. Source reference: C:/Users/rosas/Downloads/Modern Invites.png; exact anchors #b3b0f8, #e1dcf9, #d3cbf9. Existing catalog/count/visibility instructions are not changed by the color-only update. Review captures: .impeccable/review/marketing-lavender/.


Remaining-sections elegance update (2026-11-23): extend the retained lavender world with regular Instrument Serif across the Portfolio introduction, group headings, and shared invitation cards. The introduction uses the shared page-title scale; category headings use 36px/48px, and card names use 30px/36px. Large image-led cards use a 5:4 media frame with 16px corners, an inset 3:4 stationery preview with an 8px corner and 5px white bezel, and an open text body. Complete illustration art and live lettering remain aligned to the contained source ratio; photograph previews retain cover/top cropping. Preserve all card content, local colors, new-tab destinations, and collection visibility flags.

Grid: 1152px maximum section container, 20/24/32px responsive gutters, two columns from 640px, 32px horizontal gaps and 56px/80px vertical gaps. Prioritize the first card and preload only the additional first-row card at its visible breakpoint; later cards remain lazy. Source image-size strings match these wider two-column frames. Hover and keyboard focus gently zoom the background to 1.04, straighten the inset from -3deg and raise it 4px, and rotate the circular arrow 45deg. Shared page entrance and one-time scroll reveals keep SSR content visible; reduced motion removes movement. Working group navigation, Seat Finder demo, contact paths, and footer remain. Review evidence: .impeccable/review/marketing-elegance/. Love & Crafts is inspiration only; no assets or exact composition/animation are copied.
