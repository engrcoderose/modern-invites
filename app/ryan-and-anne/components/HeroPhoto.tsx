import PhotoSlideshow from "./PhotoSlideshow";
import { heroImageSizes, heroSlideInterval, heroSlides } from "../data/hero-slides";

export default function HeroPhoto() {
  return <PhotoSlideshow slides={heroSlides} sizes={heroImageSizes} label="Hero" interval={heroSlideInterval} priorityFirst decorative />;
}
