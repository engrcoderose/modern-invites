import type { GalleryImage } from "./types";
import WalkingCouple from "./assets/images/gallery/walking-couple.jpg";
import InLoveCouple from "./assets/images/gallery/inlove-couple.jpg";
import Portrait from "./assets/images/gallery/pexels-camera-treasure-928922-16841002.jpg";
import HappyCouple from "./assets/images/gallery/happy-couple.jpg";
import Flowers from "./assets/images/gallery/couple-with-flowers.jpg";
import Rings from "./assets/images/gallery/ring-focus.jpg";
import PiggyBack from "./assets/images/gallery/piggy-back-ride.jpg";
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
  alt: `A moment from our love story · Photograph ${index + 1}`,
}));
