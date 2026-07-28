# Nylgen & Kersee invitation foundation

This directory contains the complete invitation experience: hero, invitation,
countdown, gallery, event details, entourage, wedding timeline, gift guide,
photo sharing, RSVP, and footer.

## Structure

```text
nylgen-and-kersee/
├── assets/                  Invitation artwork and media
├── components/
│   ├── Hero/                  Phase 1 hero section
│   ├── Invitation/            Invitation message and ceremony summary
│   ├── Countdown/             Live wedding countdown
│   ├── Gallery/               Editorial gallery and photo viewer
│   ├── EventDetails/          Ceremony and reception cards
│   ├── Entourage/             Families, sponsors, and wedding party
│   ├── WeddingTimeline/       Celebration schedule
│   ├── GiftGuide/             Gift message
│   ├── Hashtag/               Hashtag, QR, and photo upload handoff
│   ├── RSVP/                  Simple required-fields RSVP form
│   ├── Footer/                Closing navigation and monogram
│   ├── ui/                    Reusable design-system primitives
│   └── WeddingThemeProvider.tsx
├── data/
│   └── weddingData.ts         Single source of invitation content
├── lib/
│   └── animations.ts          Framer Motion presets
└── styles/
    └── theme.css              Scoped design tokens
```

The page is wrapped in `WeddingThemeProvider` so the scoped design tokens and
reduced-motion behavior are active. Compose later sections from the exports in
`components/ui`; keep all editable invitation copy in `data/weddingData.ts`.

## RSVP tracking

The RSVP form posts to `/api/rsvp/nylgen-and-kersee`. Apply
`docs/nylgen-and-kersee-rsvp.sql` in Supabase to create the private response
table. The server route validates every required field and writes with the
server-only Supabase key; the browser receives no direct database access.
