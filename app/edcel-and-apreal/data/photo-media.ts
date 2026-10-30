import type { StaticImageData } from "next/image";
import media from "./photo-media.json";

export const { prenup: prenupMedia, story: storyMedia } = media satisfies {
  prenup: Record<string, StaticImageData>;
  story: Record<string, StaticImageData>;
};
