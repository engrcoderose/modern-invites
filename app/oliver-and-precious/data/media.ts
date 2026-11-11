import type { StaticImageData } from "next/image";
import background from "../assets/prenup/bg-invite.jpg";
import woodland from "../assets/prenup/woodland-lake.png";
import openingLogo from "../assets/design/cover.svg";
import illustration from "../assets/design/invitation.svg";
import monogram from "../assets/design/monogram.svg";
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
  openingAlt: "Oliver & Precious's O & P monogram inside a fine oval frame",
  illustrationAlt: "Oliver & Precious's O & P wedding monogram",
};

// Source paths for embedding the same cover assets in the sharing preview.
export const sharingMedia = {
  background: "app/oliver-and-precious/assets/prenup/bg-invite.jpg",
  logo: "app/oliver-and-precious/assets/design/cover.svg",
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
