---
version: 1
slug: "app-portfolio-page-tsx"
primary_target: "app/portfolio/page.tsx"
related_targets: ["lib/portfolio.ts","components/portfolio/InvitationCard.tsx"]
---

# Portfolio invitations

Scope: app/portfolio/page.tsx, lib/portfolio.ts, components/portfolio/InvitationCard.tsx. Visitor mode: Experience.

The user explicitly requested invitation cards and recent works on both the homepage and Portfolio page. Extend the established Portfolio composition, keeping wedding and other invitation groups, section navigation, seat-finder demonstration, and inquiry paths. Reuse one typed collection. Ryan & Anne, Jaydee & Bea, and Anjo & Jasmin are now hidden at the user's request because they are not finalized; retain their catalog entries with `hidden: true` and filter them from the shared public list before rendering, counting, or preloading. Leslie & Serj remains excluded. Show the existing six other entries. Preserve the invitation routes for ongoing work.

One column on mobile, two from 640px, three from 1024px. First-card image priority on mobile; second-card preloads from 640px and third-card preloads from 1024px. Responsive image sizes match the columns and gutters. Later cards stay lazy. Respect reduced motion and keyboard focus. No client invitation, environment, API or remote database changes.

User-confirmed package metadata retained on hidden entries: Ryan & Anne and Jaydee & Bea are Signature; Anjo & Jasmin is Luxury. These badges return with their cards when the entries are made visible.

Vincent & Gabrielle is a Signature Bundle; use that exact badge in both galleries.

Nylgen & Kersee is a Classic Bundle; show that badge alongside Botanical and Ivory & Sage in both galleries.
