import TimelineChurch from "./assets/images/designs/timeline-church.png";
import TimelinePhotos from "./assets/images/designs/timeline-photos.png";
import TimelineCocktails from "./assets/images/designs/timeline-cocktail.png";
import TimelineParty from "./assets/images/designs/timeline-party.png";
import TimelineDinner from "./assets/images/designs/timeline-dinner.png";
import TimelineProgram from "./assets/images/designs/timeline-program.png";
import { Walking, Together, Garden, Sitting, Embrace, Portrait, SunsetRun, SunsetWalk, SunsetLift } from "./prenup-media";
import type { GalleryImage } from "./types";

const cinematic = {
  run: { src: SunsetRun, alt: "A couple running through a field beneath a golden sunset", position: "50% 80%" },
  walk: { src: SunsetWalk, alt: "A couple walking toward the setting sun", position: "50% 70%" },
  lift: { src: SunsetLift, alt: "A joyful lift in a sunlit field", position: "50% 50%" },
  embrace: { src: Embrace, alt: "A couple embracing in the warm evening light", position: "50% 50%" },
  hills: { src: Walking, alt: "A couple holding hands on rolling hills at sunset", position: "50% 55%" },
  twirl: { src: Portrait, alt: "A pink dress caught mid-twirl in the golden evening light", position: "50% 60%" },
  lake: { src: Sitting, alt: "A couple sitting beside a lake under golden branches", position: "50% 85%" },
  together: { src: Together, alt: "A couple sharing a kiss beneath a tree", position: "50% 75%" },
  garden: { src: Garden, alt: "A couple running hand in hand through an autumn park", position: "50% 50%" },
};

export const galleryBreakPhotos: GalleryImage[] = [
  cinematic.together, cinematic.lake, cinematic.walk, cinematic.garden,
];

export const heroSlides = [
  { ...cinematic.run, mobilePosition: "50% 70%" },
  { ...cinematic.walk, mobilePosition: "50% 65%" },
  { ...cinematic.together, mobilePosition: "50% 70%" },
  { ...cinematic.twirl, mobilePosition: "50% 60%" },
];

export const afterDressCodeSlides: GalleryImage[] = [
  cinematic.garden, cinematic.embrace, cinematic.hills, cinematic.lift, cinematic.lake,
];

// Use the clean cinematic photographs; image 1 contains screenshot controls.
export const gallery: GalleryImage[] = [
  cinematic.run, cinematic.walk, cinematic.lift, cinematic.embrace,
  cinematic.hills, cinematic.twirl, cinematic.lake, cinematic.together, cinematic.garden,
];

// Ceremony, photos, registration and cocktails, reception program, dinner, party.
export const timelineIllustrations = [
  TimelineChurch, TimelinePhotos, TimelineCocktails, TimelineProgram, TimelineDinner, TimelineParty,
] as const;
