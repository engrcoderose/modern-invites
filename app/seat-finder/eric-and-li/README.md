# Eric & Li sample seat finder

Open `/seat-finder/eric-and-li` in the existing Next.js app.

The standalone demo uses fictional guest records and a sample reception layout. Search by first or last name (at least two characters), select a result, and see its table, seat, and highlighted position on the map. Example buttons provide searchable names. `Chloe` matches `Chloé Martin`; `Alex Morgan` demonstrates duplicate-name handling with a welcome-team confirmation message.

Sample assignments live in `sample-data.ts`. Do not replace these client-bundled records with private guest information. A production version should use event-scoped server lookup and authenticated seating management.

This sample requires no database, environment variables, or hostname changes. It links back to `/eric-and-li`.
