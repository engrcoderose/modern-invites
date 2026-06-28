// Types for Wedding Two Template (Modern Minimalist Romance)

import { StaticImageData } from "next/image";

export interface WeddingTwoData {
  bride: string;
  groom: string;
  weddingDate: Date;
  venue: {
    name: string;
    address: string;
    mapUrl: string;
    image?: string | StaticImageData;
  };
  reception: {
    name: string;
    address: string;
    mapUrl: string;
    image?: string | StaticImageData;
  };

  ourStory: {
    title: string;
    content: {
      title: string;
      date: string;
      description: string;
    }[];
  };

  weddingHashtag: string;
}

export interface EntourageMember {
  name: string;
  role: string;
  image?: string;
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

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
