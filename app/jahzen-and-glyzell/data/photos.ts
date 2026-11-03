import hero from "../assets/photos/sample-hero.webp";
import cover from "../assets/photos/sample-cover.webp";
import invitation from "../assets/photos/sample-invitation.webp";
import story from "../assets/photos/sample-story.webp";
import cinematic from "../assets/photos/sample-cinematic.webp";
import flowers from "../assets/photos/sample-flowers.webp";
import portrait from "../assets/photos/sample-portrait.webp";
import invitationCollage from "../assets/artwork/invitation-collage.webp";
import type { StaticImageData } from "next/image";

const countdown: StaticImageData = {
  src: "https://assets.moderninvites.com/placeholder-images/prenups/Main1-1.webp",
  width: 2560,
  height: 1708,
};

// User-approved sample photos. Replace these when the couple's own photos arrive.
export const photos = { hero, cover, invitation, invitationCollage, story, cinematic, portrait, countdown, entourageBreak: story, venueBreak: invitation, hashtagBreak: flowers };
export const photoBreaks = {
  entourage: { id: "entourage-photo", label: "A moment together", src: photos.entourageBreak, alt: "A couple sharing an embrace outdoors", position: "62% center" },
  venue: { id: "venue-photo", label: "A walk together", src: photos.venueBreak, alt: "A couple walking together outdoors", position: "46% center" },
  hashtag: { id: "hashtag-photo", label: "A quiet moment together", src: photos.hashtagBreak, alt: "A couple sitting together with a bouquet outdoors", position: "69% center" },
};
export const heroImageQuality = 85;
export const heroSlides = [
  { id: "together", src: hero, alt: "A couple relaxing together outdoors", position: "center" },
  { id: "walking", src: invitation, alt: "A couple walking hand in hand", position: "center" },
  { id: "embracing", src: story, alt: "A couple embracing", position: "center" },
];
// Landscape sources have ratio 3:2. Cover sizing accounts for frame height,
// portrait crops and maximum motion scale; portrait sources stay width-driven.
export const photoSizes = {
  cover: "max(100vw, 150svh)",
  hero: "max(112vw, 168svh)",
  cinematic: "max(110vw, 165svh)",
  photoBreak: "max(100vw, 150svh)",
  invitation: "(max-width: 639px) min(calc(100vw - 48px), 512px), (max-width: 1023px) min(calc(100vw - 80px), 512px), min(calc(45vw - 79.2px), 512px)",
};
// Landscape sources need 1.875 times the width to cover a 4:5 phone frame.
// Larger screens use a 3:2 frame, capped at the carousel's 1024px width.
const galleryLandscapeSizes = "(max-width: 639px) calc(187.5vw - 90px), (max-width: 1103px) calc(100vw - 80px), 1024px";
const galleryPortraitSizes = "(max-width: 639px) calc(100vw - 48px), (max-width: 1103px) calc(100vw - 80px), 1024px";
export const gallery = [
  { src: invitation, alt: "Sample photograph of a couple walking together", sizes: galleryLandscapeSizes, position: "center" },
  { src: portrait, alt: "Sample couple portrait", sizes: galleryPortraitSizes, position: "center 35%" },
  { src: cinematic, alt: "Sample photograph of a couple laughing", sizes: galleryLandscapeSizes, position: "center" },
  { src: flowers, alt: "Sample photograph of a couple with flowers", sizes: galleryLandscapeSizes, position: "center" },
  { src: story, alt: "Sample photograph of a couple embracing", sizes: galleryLandscapeSizes, position: "center" },
];


