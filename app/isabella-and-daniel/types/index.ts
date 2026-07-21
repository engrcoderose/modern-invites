import type { StaticImageData } from "next/image";

export interface VenueDetails {
  eyebrow: string;
  name: string;
  address: string;
  time: string;
  mapUrl: string;
  image: string | StaticImageData;
}

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

export interface WeddingTwoData {
  bride: string;
  groom: string;
  brideFullName: string;
  groomFullName: string;
  weddingDate: Date;
  dateDisplay: string;
  locationDisplay: string;
  invitationMessage: string;
  venue: VenueDetails;
  reception: VenueDetails;
  ourStory: {
    title: string;
    content: StoryChapter[];
  };
  dressCode: {
    title: string;
    description: string;
    colors: string[];
  };
  gallery: GalleryImage[];
  entourage: {
    role: string;
    names: string[];
  }[];
  guestNotes: {
    title: string;
    description: string;
  }[];
  rsvpDeadline: string;
  weddingHashtag: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface EntourageData {
  parents: { name: string }[];
  principalSponsors: { name: string }[];
  bestMan: { name: string }[];
  maidOfHonor: { name: string }[];
  secondarySponsors: {
    veil: { name: string }[];
    cord: { name: string }[];
    candle: { name: string }[];
  };
  groomsman: { name: string }[];
  bridesmaid: { name: string }[];
  ringBearer: { name: string }[];
  coinBearer: { name: string }[];
  bibleBearer: { name: string }[];
  flowerGirl: { name: string }[];
}
