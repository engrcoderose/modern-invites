import { photos } from "./photos";

export const openingPhotos = [photos.story[0], photos.invitation, photos.story[1]];

export const mobileOpeningPhotos = [{ ...photos.gift, position: "50% 50%" }, ...openingPhotos];

