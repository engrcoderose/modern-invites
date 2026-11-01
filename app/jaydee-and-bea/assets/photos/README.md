# Jaydee and Bea photographs

These 31 photographs were supplied by the user in `Invitation Pics` on November 1, 2026. They replace the draft couple photographs throughout this invitation.

Files retain the photographer's image identifiers, with spaces and duplicate-copy prefixes removed. The supplied JPEGs remain untouched in the original folder. Local WebP derivatives have a maximum edge of 2560 px, preserve orientation and aspect ratio, and omit source metadata. The sources total approximately 61.4 MB; these derivatives total approximately 12.2 MB. These are source-file measurements, not estimates of deployed bandwidth savings.

`data/prenup-media.ts` statically imports the photos for content-hashed URLs and defines their alt text. `data/photo-layout.ts` selects seven portrait photos for the slideshow and carousel, and the remaining 24 photos for the second gallery. It also selects the welcome, photo-break, and RSVP images; `data/story-photos.ts` selects the story images. The mirror diptych and engagement-stage image use uncropped gallery thumbnails. All photos open without cropping in the existing lightbox.

Next Image continues to choose responsive widths. The slideshow and welcome retain quality 85; gallery images retain the default quality. Original JPEGs are not shipped, and no remote upload or database update is required.
