---
version: 1
slug: "app-darelle-and-roselle-page-tsx"
primary_target: "app/darelle-and-roselle/page.tsx"
related_targets: []
---

# Darell and Roselle invitation

Mode: Experience. User-pinned reference: `app/vincent-and-gabrielle`.

## Direction contract

THESIS: Preserve Vincent and Gabrielle's woodland stationery invitation while replacing horizontal page turns with uninterrupted vertical reading. No couple-photo slides.

OWN-WORLD: Exact reference olive #5a6946, ivory #f2ede0, ink #414636, muted #646650 and gold #ac9b76; Anastasia for section titles, names, sentimental copy and timeline labels, Noto Serif for information and only the main The Entourage title. Preserve the woodland photographs, thin double frames and ornamental flourishes. Titles precede their top dividers. Use the exact supplied sage framed DR PNG on paper, a paper-tinted version on woodland, and the black initials cropped without the oval in navigation.

STORY: Open the invitation, read the couple's full names and date, locate the ceremony and reception, acknowledge the complete entourage, review the schedule and semi-formal dress code, then reply by email before the confirmed deadline. Identify the formal invitation through the couple-name h1 below the monogram; retain the other approved visible section titles and keep gratitude and celebration lines as supporting copy.

FIRST VIEWPORT: Full-screen dark woodland cover, centered paper-tinted supplied framed DR artwork, restrained couple names and date below, and a clear opening action. The ivory formal invitation follows with the same supplied artwork in its original sage; a paper sticky navigation with black unframed DR initials joins it.

FORM: User-selected scrolling adaptation of the existing invitation; no concept seed because the reference and behavior are explicitly pinned. Full-width alternating ivory, woodland and olive sections, with content constrained to the original stationery proportions.

The timeline, dress code, and FAQ remain separate sections, with an ivory
timeline, dark olive framed dress code and pale text, then an ivory FAQ.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Motion update

User requested the same animation as Vincent and Gabrielle. The focal moment
is the existing shared-monogram handoff (1.4s) inside the dissolving
woodland cover (1.6s, crossfade starts at 0.5s). Formal text fades in over 0.5s;
navigation fades over 0.65s. Scroll content inherits the reference's 10px rise,
0.85s duration, decelerating easing, and capped stagger, once per content group.
No horizontal page folds or photo slides. Reduced motion removes movement and
stagger; native scrolling remains available after opening. Default server HTML
keeps the prior cover and anchor links usable without JavaScript.

## Approved monogram update

The user supplied `dr-supplied-framed.png` in sage and `dr-supplied-black.png`
in black. Display their exact pixels rather than rebuilding the artwork from
the earlier generated initials and separate frame. Both PNGs include an oval;
navigation crops only the central initials from the black file to satisfy the
approved unframed navigation treatment. The framed crop is x 360–1640,
y 176–1828 (320/413 aspect ratio); initials crop is x 735–1285,
y 690–1247 (550/557 aspect ratio), on the 2000px canvas.
The opening crossfades paper-tinted and original sage versions of the same
framed artwork while moving to the formal invitation. Timing is unchanged.
Retain earlier assets and concepts as unused design deliverables.

## Approved section titles

The formal invitation uses the couple-name h1 below its monogram, without a
separate title above it. Other section titles: The Wedding Venues; The Entourage; The Wedding Day;
The Dress Code; Frequently Asked Questions; RSVP; Save the Date.
“With Love and Gratitude” supports The Entourage, whose wedding-party title
is a subheading. The closing celebration line supports Save the Date.

Only the main **The Entourage** title uses Noto Serif at `clamp(22px, 3vw, 30px)`,
weight 500, line height 1.4 and `.02em` tracking. All other main section titles
and **Our Wedding Party** retain Anastasia at `clamp(40px, 6vw, 64px)`, weight
400 and line height 1.15. **RSVP** retains its 36px Anastasia title.
The shared heading defaults to calligraphy and opts into serif only for
The Entourage. It places the title above the ornamental divider with a 20px
gap. Supporting sentimental copy and timeline event labels remain Anastasia.
The serif request must not extend to Save the Date or other titles.
