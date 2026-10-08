import PhotoSlideshow from "../components/PhotoSlideshow";
import { storyImageSizes, storySlides } from "../data/story-slides";

export default function StoryPhotoBreakSection() {
  return (
    <section id="story-photos" aria-label="Ryan and Anne’s prenup photos" aria-roledescription="carousel"
      className="overflow-hidden bg-[#242320] py-14 text-[#f5f0e6] sm:py-20">
      <PhotoSlideshow slides={storySlides} sizes={storyImageSizes} label="Story" portrait />
    </section>
  );
}
