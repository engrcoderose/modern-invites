import type { StaticImageData } from "next/image";
import background from "../assets/prenup/bg-invite.jpg";
import woodland from "../assets/prenup/woodland-lake.png";
import openingLogo from "../assets/design/front-logo.png";
import illustration from "../assets/design/wedding-logo.png";
import monogram from "../assets/design/monogram.png";
import ceremony from "../assets/design/church_logo.png";
import reception from "../assets/design/reception_logo.png";
import attire from "../assets/design/Wedding guest peg - rows.png";
import {
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  together1,
  together2,
  together3,
  together4,
  together5,
} from "./prenup-media";

// The owner approved these client-local assets for this invitation.
export const media = {
  background,
  woodland,
  openingLogo,
  illustration,
  monogram,
  ceremony,
  reception,
  attire,
  openingAlt: "Vincent and Gabrielle's VG monogram inside an ivory lace frame",
  illustrationAlt: "Vincent and Gabrielle's ornate VG wedding monogram",
  attireAlt: "Outfit inspiration with women's dresses above men's suits",
};

// Source paths for embedding the same cover assets in the sharing preview.
export const sharingMedia = {
  background: "app/vincent-and-gabrielle/assets/prenup/bg-invite.jpg",
  logo: "app/vincent-and-gabrielle/assets/design/front-logo.png",
};

export type SlideshowPhoto = {
  src: StaticImageData;
  alt: string;
  position: string;
};
export const portraitPhotos: SlideshowPhoto[] = [
  {
    src: photo1,
    alt: "A couple silhouetted against a warm sunset",
    position: "center",
  },
  {
    src: photo2,
    alt: "Holding hands beneath glowing red lanterns",
    position: "center bottom",
  },
  {
    src: photo3,
    alt: "Looking at each other across an ornate green veranda",
    position: "center bottom",
  },
  {
    src: photo4,
    alt: "Standing together beside yellow walls and red lanterns",
    position: "center",
  },
  {
    src: photo5,
    alt: "A kiss outside a lantern-lit building",
    position: "60% center",
  },
];
export const fullPagePhotos: SlideshowPhoto[] = [
  {
    src: together1,
    alt: "Walking hand in hand beside a golden wall",
    position: "24% bottom",
  },
  {
    src: together2,
    alt: "Looking at each other against a weathered yellow wall",
    position: "50% bottom",
  },
  {
    src: together3,
    alt: "A sunset kiss beneath an ornate veranda",
    position: "60% center",
  },
  {
    src: together4,
    alt: "Holding hands beside yellow walls and red lanterns",
    position: "80% center",
  },
  {
    src: together5,
    alt: "Walking hand in hand past a colorful shop",
    position: "64% bottom",
  },
];
