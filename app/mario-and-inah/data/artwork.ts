import type { StaticImageData } from "next/image";
import attireImage from "../assets/photos/attire-inspiration.webp";

const baseUrl = "https://assets.moderninvites.com/mario-and-inah/images/designs";

// Dimensions verified against the original images to preserve responsive layout.
function designImage(filename: string, width: number, height: number): StaticImageData {
  return { src: `${baseUrl}/${encodeURIComponent(filename)}`, width, height };
}

const heroLeft = designImage("hero-flower-left.webp", 1082, 1060);
const heroRight = designImage("hero-flower-right.webp", 1098, 1076);
const countdownLeft = designImage("counting-left-image.webp", 637, 1050);
const countdownRight = designImage("counting-right-image.webp", 637, 1050);
const entouragePattern = designImage("entourage-bg-pattern.webp", 1200, 1193);
const entourageBouquet = designImage("entourage-design-flower.webp", 761, 453);
const entourageLeft = designImage("entourage-left-flower.webp", 731, 1047);
const entourageRight = designImage("entourage-right-flower.webp", 719, 1047);
const venueLine = designImage("venue-line-flower.webp", 1017, 275);
const venueUpper = designImage("venue-upper-flowers.webp", 1200, 616);
const venueLower = designImage("venue-lower-flowers-hd.webp", 1800, 874);
const timelineUpper = designImage("hero-left-upper-flower.webp", 465, 468);
const timelineLower = designImage("hero-right-upper-flower.webp", 478, 480);

export const artwork = { heroLeft, heroRight, countdownLeft, countdownRight, entouragePattern, entourageBouquet, entourageLeft, entourageRight, venueLine, venueUpper, venueLower, timelineUpper, timelineLower };

export const attireInspiration = attireImage;

export const rosePainting = designImage("gallery-rose-painting.png", 1198, 605);

export const venuePhoto = designImage("wedding-venue.jpg", 1170, 776);
