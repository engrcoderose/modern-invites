# Public invitation domain

Public URL: `https://mariananddeejaywedding.moderninvites.com/`

The root on this hostname rewrites internally to `/marian-and-deejay`. `/calendar` rewrites to the existing calendar download. Canonical/Open Graph metadata and the dashboard's invitation link use the public URL. The RSVP event slug remains `marian-and-deejay`.

Direct public requests to `/marian-and-deejay`, its `/calendar` route, and the previous `marian-and-dee-jay` spelling return an uncached 404. This includes main-site, custom-domain and Vercel preview hosts. Loopback hosts (`localhost`, `127.0.0.1`, `[::1]`) retain path-based access in development and local production builds. Media paths and RSVP APIs are excluded from the retired-page matcher.

## Hosting rollout

1. Deploy these changes to the existing Modern Invites Vercel project.
2. Ensure `mariananddeejaywedding.moderninvites.com` is attached to that project's production environment with valid TLS. No new hosting project is needed.
3. The DNS lookup on November 9, 2026 already returned a CNAME to `74ffe8ae01bdc026.vercel-dns-017.com`. Preserve that record unless the existing Vercel project explicitly requires a different value.
4. Verify the public root serves Marian and Dee Jay, the canonical URL is the new domain, and both old path spellings return 404 on public hosts. Verify the film, music, calendar and RSVP work on the new host.

Direct public HTTP checks on November 9 returned Vercel HTTP 429 for both the requested domain and the old main-site URL, so those checks did not establish the deployed routing state. No hosting configuration or deployment was changed by the local code edits. No credentials or Supabase access are required for the isolated routing tests.
