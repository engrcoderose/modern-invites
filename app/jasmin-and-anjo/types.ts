import type { StaticImageData } from "next/image";

interface VenueInfo {
  eyebrow: string;
  name: string;
  address: string;
  time: string;
  mapUrl: string;
}

export type VenueDetails = VenueInfo & (
  | { mediaType: "image"; image: string | StaticImageData; imageAlt?: string }
  | { mediaType: "map"; mapEmbedUrl: string }
);

export interface StoryChapter {
  title: string;
  date: string;
  description: string;
}

export interface GalleryImage {
  src: string | StaticImageData;
  alt: string;
  position?: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}
