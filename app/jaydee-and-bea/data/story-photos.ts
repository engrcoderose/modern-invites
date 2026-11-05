import { prenupPhotos } from "./prenup-media";
import portrait from "../assets/designs/story-portrait-floral.webp";

// Keep the original photo identity when a decorative derivative is displayed.
export const storyPhotoSources = {
  portrait: prenupPhotos.dscf1558,
  landscape: prenupPhotos.engagementPic,
};

export const storyPhotos = {
  portrait: { src: portrait, alt: storyPhotoSources.portrait.alt },
  landscape: { ...storyPhotoSources.landscape, position: "50% 50%" },
};
