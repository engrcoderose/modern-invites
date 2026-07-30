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
│   ├── RSVP/                  Smart household RSVP integration
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

The invitation uses the shared Smart RSVP flow in `components/smart-rsvp`.
This event is configured with `rsvp_access_mode = 'name_search'`, so guests
start with exact invited-name verification instead of a shared RSVP code.
Responses are stored in the normalized `events`, `invitations`, `guests`, and
`rsvps` tables and appear in the client dashboard.

The older `/api/rsvp/nylgen-and-kersee` endpoint and
`docs/nylgen-and-kersee-rsvp.sql` are retained temporarily for rollback only;
the invitation UI no longer calls them.
