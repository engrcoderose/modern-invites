# Photo sharing frontend

This is a **browser-local mock**, not a connected upload service. No Supabase, R2, credentials, APIs, or real event records are used.

## Routes

- `/memories/demo`: guest album, multiple photo selection, previews, file and image-decoding validation, optional caption, local save feedback, gallery, keyboard-accessible photo viewer, and individual original-file downloads.
- `/photo-sharing-preview`: public mock management workspace, usable without signing in.
- `/dashboard/photo-sharing`: the same mock workspace inside the existing authenticated client shell. Authentication is unchanged; it requires the existing client login. The navigation explicitly labels the feature as a demo.
- Any other `/memories/[slug]` returns 404 until real event integration exists.

## Mock behavior

`infrastructure/demo-album.ts` contains fictional display names, sample submissions, and settings. It reuses two existing marketing photographs from `public/images/`; these are illustrative images, not photographs of a real Alex and Jamie event. Sample byte sizes are illustrative too. No raster assets are added or duplicated.

The IndexedDB adapter stores the mock album and selected `File`/`Blob` data in this browser. Reloads retain changes. BroadcastChannel and window-focus refresh synchronize ordinary changes across tabs on the same origin; this is a demo store, not a multi-user concurrency service. Local files never leave the browser. Clearing site data removes them. Reset restores the seeded sample data after confirmation.

Supported photos: JPG, PNG, and WebP, up to 20 MB each, 10 files per batch, 100 photos and 200 MB per mock album. Actual available browser storage may be lower. HEIC conversion and video uploads are not implemented. Invalid or undecodable photos remain removable/retryable; already saved photos are not repeated when retrying failed items. Local check/save progress is labeled as such, not presented as network upload progress.

New photos require approval by default. Turning moderation off only auto-approves subsequent additions. Hidden and pending photos are excluded from the guest gallery. Turning off gallery visibility does not close uploads; turning off uploads does not hide the gallery. Deletion and reset require confirmation. Original downloads are individual files; a bulk ZIP export is not implemented.

QR codes contain the current origin and `/memories/demo`. A different browser/device receives its own separate demo, not the originating browser's photos. A localhost QR requires the serving device to be reachable under an appropriate origin to work from a phone.

## Integration boundary

Keep `domain/` types and the presentation components. Replace the browser repository and mock controller with the established event-authorized application/repository patterns when the backend is approved. Resolve the real event and its enabled photo-sharing service server-side; never infer authorization from a supplied slug or client-side settings.

Integration still needs: real event ownership and enabled-service configuration; album settings and media metadata persistence; authenticated management; upload authorization, quotas and rate limits; private object storage and signed upload/read/download access; server-side file verification before publication; image thumbnail processing and privacy metadata handling; abandoned-upload cleanup; retention/deletion policy; and deployment origin/CORS configuration. Do not expose real private albums through the public mock preview. Do not apply the static invitation image cache TTL to private or dynamic gallery/authentication responses.

Prepare database changes as reviewable SQL for the user to run manually. No admin records or database migrations have been created for this frontend.

## Checks

`npm run test:photo-sharing` runs synthetic domain checks without loading environment files. Type checking can run directly with `node node_modules/typescript/bin/tsc --noEmit --incremental false`. Run Next.js dev/build/lint only in a sanitized isolated copy that excludes private environment files, following root AGENTS.md.
