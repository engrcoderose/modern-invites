import type { StaticImageData } from "next/image";

export interface Venue {
  id: string;
  label: string;
  name: string;
  address: string;
  time: string;
  timeLabel: string;
  note?: string;
  mapUrl: string | null;
}

export interface EntourageGroup {
  title: string;
  members?: readonly string[];
  memberColumns?: readonly (readonly string[])[];
  roles?: readonly { title: string; members: readonly string[] }[];
  pending?: boolean;
}

export interface GalleryPhoto {
  src: string | StaticImageData;
  alt: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
}

export interface WeddingData {
  couple: { names: readonly [string, string]; display: string; initials: string; fullNames: { bride: string; groom: string } | null };
  date: { iso: string; display: string; weekday: string; short: string; timezone: string };
  palette: readonly { name: string; hex: string }[];
  venues: readonly Venue[];
  timeline: readonly TimelineEvent[];
  story: readonly { date: string; title: string; description: string }[];
  entourage: readonly EntourageGroup[];
  dressCode: { title: string; description: string; restriction: string; palette: readonly { name: string; hex: string }[] };
  rsvp: { deadline: string | null; deadlinePlaceholder: string; url: string | null; eventSlug: string | null; pendingMessage: string };
  gallery: { photos: readonly GalleryPhoto[]; placeholder: string; draftCaptions: readonly string[] };
  music: { src: string | null; title: string };
  hashtag: { value: string | null; placeholder: string };
  pending: { map: string; fonts: string; fullNames: string; color: string };
}
