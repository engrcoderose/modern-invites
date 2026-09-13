import type { GalleryImage } from "./types";
import WalkingCouple from "../isabella-and-daniel/assets/walking-couple.jpg";
import InLoveCouple from "../isabella-and-daniel/assets/inlove-couple.jpg";
import Portrait from "../isabella-and-daniel/assets/pexels-camera-treasure-928922-16841002.jpg";
import HappyCouple from "../isabella-and-daniel/assets/happy-couple.jpg";
import Flowers from "../isabella-and-daniel/assets/couple-with-flowers.jpg";
import Rings from "../isabella-and-daniel/assets/ring-focus.jpg";
import PiggyBack from "../isabella-and-daniel/assets/piggy-back-ride.jpg";
import PrenupPoster from "./assets/images/prenup/pexels-king-caplis-471600979-36396114.jpg";
import ChurchImage from "./assets/images/prenup/church-image.jpg";
import StoryWalk from "./assets/images/prenup/pexels-king-caplis-471600979-36396110.jpg";
import StoryEmbrace from "./assets/images/prenup/pexels-king-caplis-471600979-36266064.jpg";

export { WalkingCouple, InLoveCouple, Portrait, HappyCouple, Flowers, Rings, PiggyBack, PrenupPoster, ChurchImage, StoryWalk, StoryEmbrace };

export const gallery: GalleryImage[] = [
  WalkingCouple,
  Portrait,
  HappyCouple,
  Flowers,
  Rings,
  PiggyBack,
  InLoveCouple,
].map((src, index) => ({
  src,
  alt: `Placeholder wedding photograph ${index + 1}; Jasmin and Anjo’s photos to follow`,
}));
