import { prenupPhotos as photos } from "./prenup-media";
import type { GalleryPhoto } from "../types/wedding";

export const galleries: readonly (readonly GalleryPhoto[])[] = [
  [
    photos.dscf1541, photos.dscf0947, photos.dscf1472RevC, photos.dscf1558,
    photos.dscf1588, photos.dscf1678RevA, photos.dscf1768,
  ],
  [
    photos.ljd4660, photos.dscf0734, photos.dscf0759, photos.dscf0810,
    photos.dscf1089RevA, photos.dscf1139, photos.dscf1201, photos.dscf1232,
    photos.dscf1360, photos.dscf1426RevB, photos.dscf1443RevB, photos.dscf1521,
    photos.dscf1533, photos.dscf1793RevB, photos.ljd4620, photos.ljd4626,
    photos.ljd4631, photos.ljd4731, photos.ljd4746, photos.ljd4770,
    photos.ljd4794, photos.ljd4819BluGreen, photos.croppedDscf1597, photos.engagementPic,
  ],
];

export const photoBreaks = {
  afterStory: photos.dscf1426RevB,
  timelineSlides: galleries[0],
  afterEntourage: photos.ljd4794,
};

export const welcomePhoto = photos.ljd4660;
export const rsvpPhoto = photos.dscf1232;
