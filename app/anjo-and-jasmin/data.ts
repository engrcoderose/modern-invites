import { wedding as originalWedding } from "./wedding-details";

export const wedding = originalWedding;

export const envelopeMessage = "Join us as we celebrate our wedding. We can't wait to share this special day with you.";
export const attireDressCode = "Long sleeves & pastel dresses";
export const attireDescription = "Family and friends, dress to impress in light or colorful tones from our pastel palette.";
export const mensAttire = "Long sleeves and pants. Linen pants, long sleeves, or a button-up are all welcome!";
export const womensAttire = "Long or floral dress. Midi/maxi dresses and breezy silhouettes. Bring on the color and glamour! Ruffles, textures, and florals are encouraged.";
export const sponsorAttire = [
  { role: "For our Ninangs", style: "Filipiniana", description: "Modern or traditional Filipiniana. Color: ivory, cream, or beige." },
  { role: "For our Ninongs", style: "Barong Tagalog", description: "White inner, black pants, and black shoes. Barong color: ivory, cream, or beige." },
];
export const rsvpDeadline = "October 30, 2026";
export const coordinator = {
  name: "Ms. Margarette Santos",
  phone: "0945 826 5580",
  phoneHref: "tel:+639458265580",
};
export const unpluggedCeremony = {
  title: "Unplugged Ceremony",
  description: "We invite you to be fully present as we say our vows. Kindly silence and put away your phones and cameras during the ceremony, and let our photographers capture these special moments. Thank you for sharing this moment with us.",
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
  { title: "Libu-libong Buwan", src: "/music/anjo-and-jasmin/libu-libong-buwan.mp3" },
  { title: "PALAGI (Wedding Version)", src: "/music/anjo-and-jasmin/palagi-wedding-version.mp3" },
  { title: "Wedding music", src: "/music/anjo-and-jasmin/wedding-music.mp3" },
];

export interface GiftRegistry {
  name: string;
  description?: string;
  url: `https://${string}`;
}

// Add the couple's actual registry links here when supplied.
export const giftRegistries: GiftRegistry[] = [];

export const faqs = [
  {
    question: "When is the wedding?",
    answer: `Our wedding is on ${wedding.date} at ${wedding.time} (Philippine time). Please arrive at the church at 2:30 PM. See the wedding timeline for the day's schedule.`,
  },
  {
    question: "Where are the ceremony and reception?",
    answer: `The ceremony will be held at ${wedding.ceremony}, Malabon. The reception follows at ${wedding.receptionFloor}, ${wedding.reception}, ${wedding.location}. You can find directions in the Location section.`,
  },
  { question: "What should I wear?", answer: `${attireDescription} Our pastel palette includes ${wedding.palette.map(({ name }) => name.toLowerCase()).join(", ")}. Gentlemen: ${mensAttire} Ladies: ${womensAttire} ${sponsorAttire.map(({ role, style, description }) => `${role}: ${style}. ${description}`).join(" ")}` },
  {
    question: "How do I RSVP?",
    answer: `Please RSVP by ${rsvpDeadline}. If you have any concerns, please contact our coordinator, ${coordinator.name}, at ${coordinator.phone}. The RSVP demo lets you search a sample name, select its invitation, and try the attendance form. No replies are sent or saved yet.`,
  },
  {
    question: "Do you have a gift registry?",
    answer: giftRegistries.length
      ? "Our registry links are in the Gift Registry section. Your presence is our greatest gift."
      : "Your presence is our greatest gift. Our gift preferences and any registry details will be shared here soon. Thank you for thinking of us with so much love.",
  },
  {
    question: "Where can we share our wedding photos?",
    answer: `Share your favorite moments with ${wedding.hashtag} so we can relive the day together. You can copy the hashtag in the photo-sharing section above.`,
  },
];
