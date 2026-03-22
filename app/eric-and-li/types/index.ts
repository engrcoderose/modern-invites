import { StaticImageData } from "next/image";

// Types for Classic Wedding Template

export interface WeddingData {
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
  groomsmen: { name: string }[];
  bridesmaids: { name: string }[];
  ringBearer: { name: string }[];
  coinBearer: { name: string }[];
  bibleBearer: { name: string }[];
  flowerGirls: { name: string }[];
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

