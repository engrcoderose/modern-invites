import TimelineChurch from "../joshua-and-bea/assets/images/designs/timeline-church.png";
import TimelineRings from "../joshua-and-bea/assets/images/designs/timeline-rings.png";
import TimelineExit from "../joshua-and-bea/assets/images/designs/timeline-exit.png";
import TimelineParty from "../joshua-and-bea/assets/images/designs/timeline-party.png";
import TimelineDinner from "../joshua-and-bea/assets/images/designs/timeline-dinner.png";
import TimelineDance from "../joshua-and-bea/assets/images/designs/timeline-dance.png";
import { gallery as originalGallery } from "../joshua-and-bea/media";
import {
  Walking,
  Together,
  Garden,
  Sitting,
  Embrace,
  Portrait,
} from "../joshua-and-bea/prenup-media";
import type { GalleryImage } from "../joshua-and-bea/types";

export const galleryBreakPhotos: GalleryImage[] = [
  { src: Portrait, alt: "Anjo and Jasmin sharing a quiet embrace in the garden", position: "82% 48%" },
  { src: Together, alt: "Anjo and Jasmin leaning together on a garden bench", position: "50% 48%" },
  { src: Walking, alt: "Anjo and Jasmin walking hand in hand in the garden", position: "50% 45%" },
  { src: Garden, alt: "Anjo and Jasmin sharing a playful moment in the garden", position: "50% 48%" },
];

export const heroSlides = [
  { src: Walking, alt: "Anjo and Jasmin walking hand in hand in the garden", position: "50% 45%", mobilePosition: "50% 45%" },
  { src: Together, alt: "Anjo and Jasmin leaning together on a garden bench", position: "50% 48%", mobilePosition: "50% 48%" },
  { src: Garden, alt: "Anjo and Jasmin sharing a playful moment in the garden", position: "50% 48%", mobilePosition: "50% 48%" },
  { src: Sitting, alt: "Anjo and Jasmin sitting together among the greenery", position: "50% 45%", mobilePosition: "50% 45%" },
  { src: Embrace, alt: "Anjo and Jasmin embracing in the garden", position: "50% 48%", mobilePosition: "82% 48%" },
];

export const afterDressCodeSlides: GalleryImage[] = [
  { src: Garden, alt: "Anjo and Jasmin sharing a playful moment in the garden", position: "50% 48%" },
  { src: Together, alt: "Anjo and Jasmin leaning together on a garden bench", position: "50% 48%" },
  { src: Walking, alt: "Anjo and Jasmin walking hand in hand in the garden", position: "50% 45%" },
  { src: Sitting, alt: "Anjo and Jasmin sitting together among the greenery", position: "50% 45%" },
  { src: Embrace, alt: "Anjo and Jasmin embracing in the garden", position: "82% 48%" },
];

// Keep the original seven images and add five existing prenup photographs.
export const gallery: GalleryImage[] = [
  ...originalGallery,
  {
    src: Walking,
    alt: "Anjo and Jasmin walking hand in hand in the garden",
    position: "50% 45%",
  },
  {
    src: Together,
    alt: "Anjo and Jasmin leaning together on a garden bench",
    position: "50% 48%",
  },
  {
    src: Garden,
    alt: "Anjo and Jasmin sharing a playful moment in the garden",
    position: "50% 48%",
  },
  {
    src: Sitting,
    alt: "Anjo and Jasmin sitting together among the greenery",
    position: "50% 45%",
  },
  {
    src: Embrace,
    alt: "Anjo and Jasmin embracing in the garden",
    position: "82% 48%",
  },
];

// Church arrival, wedding, dinner, first dance, party, and send-off.
export const timelineIllustrations = [
  TimelineChurch,
  TimelineRings,
  TimelineDinner,
  TimelineDance,
  TimelineParty,
  TimelineExit,
] as const;
