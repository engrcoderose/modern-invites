# Smart RSVP deployment guide

The Smart RSVP code is production-ready after the checks in this guide pass. The database remains the final authority for event access, party membership, guest limits, and RSVP updates.

## 1. Confirm the Supabase project

In Supabase, open **Table Editor** and confirm that the event, invitations, guests, and RSVP records contain the real event data. Then open **SQL Editor** and verify that these functions still exist:

- `verify_event_rsvp_code`
- `search_guest_invitation`
- `get_invitation_party`
- `submit_invitation_rsvp`

Keep Row Level Security enabled on `events`, `invitations`, `guests`, and `rsvps`. The browser does not connect to these tables directly; the Next.js server calls the database functions with the server-only secret key.

## 2. Configure local environment variables

Copy `.env.example` to `.env.local` and replace both placeholder values. Do not commit `.env.local`.

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase **Project Settings → API → Project URL**
- `SUPABASE_SECRET_KEY`: the server-only Supabase secret key

After changing environment variables, stop and restart the development server.

## 3. Run the automated checks

Run:

```bash
npm run test:rsvp
npm run build
```

The RSVP tests cover deadline handling, same-site request protection, rate limiting, and email validation. The production build checks all TypeScript and Next.js routes.

## 4. Perform one complete manual test

Use a test invitation and verify every case below before using real guest responses:

1. Correct event code opens the name search.
2. Incorrect code shows a safe error.
3. Exact invited name returns the correct household.
4. Unknown name returns no invitation.
5. Every household member appears exactly once.
6. Submitting without answering every member is blocked.
7. Attending above `max_attendees` is blocked.
8. All declining responses save successfully.
9. Dietary restrictions save only for attending guests.
10. A second submission updates the existing RSVP instead of creating duplicates.
11. A closed event or expired deadline blocks access and submission.
12. Refreshing the page and searching again shows the saved answers.

Check the `guests` and `rsvps` tables after submitting to confirm the saved values.

## 5. Deploy to Vercel

1. Push the project to its private Git repository.
2. Import the repository in Vercel.
3. Open **Project Settings → Environment Variables**.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SECRET_KEY` for Production and Preview.
5. Deploy the project.
6. Open the live `/stephanie-at-18` page and repeat the manual test with a test household.

Never paste the Supabase secret key into browser code, screenshots, Git commits, or a variable whose name starts with `NEXT_PUBLIC_`.

## Security behavior now included

- Request bodies are limited and must be JSON.
- Cross-site browser requests are rejected.
- Repeated access, search, party-loading, and submission attempts are rate-limited per client IP.
- API responses are marked `no-store` and receive basic security headers.
- RSVP deadlines are checked before guest data is returned and again by the database during submission.
- Database error details are logged only on the server; guests receive safe messages.

The included rate limiter protects each running application instance. If the site later receives high traffic across many server instances, replace it with a shared rate-limit store such as a database or managed Redis service.
