# Anjo & Jasmin seat finder

Dedicated client folder, separate from the invitation.

- Local route: `/seat-finder/anjo-and-jasmin`
- Intended public URL: `https://seatfinder.anjoandjasminwedding.moderninvites.com`
- Hostnames cannot contain `&`; the URL uses `and` while visible names use `&`.

## Current scope

This is a holding page and hostname routing setup. No guest search, table assignments, database changes, or seating admin screens have been implemented here. The invitation is unchanged. The existing client login and dashboard remain at `/client-login` and `/dashboard`; administrator provisioning remains at `/admin/clients`.

`next.config.ts` rewrites `/` on the exact seat-finder hostname to this route before the main homepage is resolved. Other hostnames keep their existing homepage. The local route is also available for development. Restart the development server after changing the routing configuration.

## Activate the public URL

For the existing project if hosted on Vercel:

1. Deploy these changes to the existing Next.js project.
2. In that project's Settings > Domains, add the full hostname `seatfinder.anjoandjasminwedding.moderninvites.com` as a domain serving this project, not a redirect.
3. At the DNS provider for `moderninvites.com`, add the CNAME record Vercel supplies. The relative record name is `seatfinder.anjoandjasminwedding`; use the exact target shown by Vercel.
4. Wait for domain verification and an HTTPS certificate covering this exact hostname. Do not assume a `*.moderninvites.com` certificate covers this nested hostname.
5. Check that the hostname opens the seat-finder page and the main domain still opens the normal homepage.

No DNS or hosting changes were made by creating this folder. For a different hosting provider, attach the same exact hostname to the existing Next.js deployment using that provider's DNS and certificate instructions.

Reference: https://vercel.com/docs/domains/working-with-domains/add-a-domain
Routing: https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites

## Next implementation

Connect this client to its real event ID, add event-scoped reception tables and assignments, extend the authenticated dashboard to manage them, and add a limited guest lookup here. Keep guest records on the server and authorize seating edits against the signed-in client's event access. Do not reuse the RSVP deadline as the seat-finder deadline: guests need their seats on the wedding day.
