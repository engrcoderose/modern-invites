import { wedding as originalWedding } from "./wedding-details";

export const wedding = originalWedding;

export const envelopeMessage = "Join us as we celebrate our wedding. We can't wait to share this special day with you.";
export const attireDressCode = "Long sleeves & pastel dresses";
export const attireDescription = "Please wear light or colorful tones from our pastel palette.";
export const mensAttire = "Long sleeves and pants. Linen pants or a button-up are welcome.";
export const womensAttire = "Long or floral dress. Midi/maxi dresses, ruffles, textures, and florals are welcome.";
export const sponsorAttire = [
  { role: "For our Ninangs", style: "Filipiniana", description: "Modern or traditional, in ivory, cream, or beige." },
  { role: "For our Ninongs", style: "Barong Tagalog", description: "Ivory, cream, or beige barong with a white inner, black pants, and black shoes." },
];
export const rsvpEventSlug = "jasmin-and-anjo-wedding";
export const rsvpDeadline = "October 30, 2026";
export const coordinator = {
  name: "Ms. Margarette Santos",
  phone: "0945 826 5580",
  phoneHref: "tel:+639458265580",
};
export const unpluggedCeremony = {
  title: "Unplugged Ceremony",
  description: "Please silence and put away your phones and cameras during the ceremony. Our photographers will capture the moments.",
};

export interface EntouragePreparation {
  group: string;
  venue?: string;
  address?: string;
  arrivalTime?: string;
  instructions?: string[];
  mapUrl?: `https://${string}`;
}

// Add confirmed preparation details here; use separate entries for groups
// with different venues or schedules. Empty fields remain marked as pending.
export const entouragePreparation: EntouragePreparation[] = [];

export interface MusicTrack {
  title: string;
  src: string;
}

// Optional tuple entries allow zero to four tracks, with a compile-time limit.
export type WeddingPlaylist = readonly [MusicTrack?, MusicTrack?, MusicTrack?, MusicTrack?];

export const backgroundMusic: WeddingPlaylist = [
  { title: "Bawat Daan — Ebe Dancel", src: "https://assets.moderninvites.com/anjo-and-jasmin/music/Ebe%20Dancel%20-%20Bawat%20Daan.mp3" },
  { title: "Libu-libong Buwan", src: "https://assets.moderninvites.com/anjo-and-jasmin/music/libu-libong-buwan.mp3" },
  { title: "Tahanan — El Manu", src: "https://assets.moderninvites.com/anjo-and-jasmin/music/El%20Manu%20-%20Tahanan.mp3" },
];

export interface GiftRegistry {
  name: string;
  description?: string;
  url: `https://${string}`;
}

export const giftNote = "Your presence is a gift in itself. If you wish to give a gift, a financial contribution toward our future together would be deeply appreciated.";

// Add the couple's actual registry links here when supplied.
export const giftRegistries: GiftRegistry[] = [];

export const faqs = [
  {
    question: "When should I RSVP?",
    answer: `Please RSVP by ${rsvpDeadline}.`,
  },
  {
    question: "How do I RSVP?",
    answer: `Enter your full invited name in the RSVP section, select your invitation, and confirm each guest's attendance. Contact ${coordinator.name} at ${coordinator.phone} for assistance.`,
  },
  {
    question: "Are children invited?",
    answer: "No, our celebration is for adults only.",
  },
  {
    question: "Can I bring a plus-one?",
    answer: "No, attendance is limited to the guests named on your invitation.",
  },
  {
    question: "Is there a gift registry?",
    answer: giftRegistries.length
      ? "Yes. Our registry links are in the Gifts section."
      : "Yes, we have a gift registry.",
  },
];
