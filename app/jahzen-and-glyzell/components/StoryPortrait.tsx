import SamplePhoto from "./SamplePhoto";
import { storyPhoto, storyPhotoSizes } from "../data/story-photos";

export default function StoryPortrait() {
  return <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
    <SamplePhoto src={storyPhoto.src} alt={storyPhoto.alt} sizes={storyPhotoSizes} position={storyPhoto.position} />
  </div>;
}
