import { wedding as originalWedding } from "../jasmin-and-anjo/data";

// Share the existing content while applying confirmed details to this version.
export const wedding = {
  ...originalWedding,
  date: "Saturday, November 21, 2026",
  dateDisplay: "November 21, 2026",
  time: "3:00 PM",
  countdownDate: "2026-11-21T15:00:00+08:00",
  receptionFloor: "2/F",
  // Sampled from the seven swatches in the supplied dress-code reference.
  palette: [
    { name: "Champagne", color: "#ede2c6" },
    { name: "Peach", color: "#fbc4a6" },
    { name: "Blush", color: "#fdc7d5" },
    { name: "Powder blue", color: "#bbd6f3" },
    { name: "Lilac", color: "#ffc9fd" },
    { name: "Butter yellow", color: "#fffdd7" },
    { name: "Sage", color: "#d6deaf" },
  ],
};

export const invitationMessage = `Together with our families, we, ${wedding.groom} and ${wedding.bride}, request the honor of your presence as we celebrate the sacrament of marriage on ${wedding.date}, at ${wedding.time}, at ${wedding.ceremony}, Malabon. Join us afterward at ${wedding.receptionFloor}, ${wedding.reception}, ${wedding.location} for an evening of love, laughter, and celebration.`;
export const attireDressCode = "Cocktail / semi-formal";
export const attireDescription = "We kindly request that our guests wear cocktail/semi-formal attire in these colors on our special day.";
export const mensAttire = "Long-sleeved shirts in any shade of pastel, paired with pants.";
export const rsvpDeadline = "Our RSVP deadline and response details will be shared soon.";

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
  { title: "Libu-libong Buwan", src: "/music/isabelle-and-daniel-music-Libu-libong%20buwan.mp3" },
  { title: "PALAGI (Wedding Version)", src: "/music/PALAGI%20(Wedding%20Version).mp3" },
  { title: "Wedding music", src: "/music/eric-and-li-music.mp3" },
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
    answer: `Our wedding is on ${wedding.date} at ${wedding.time} (Philippine time). The other times shown in the wedding timeline are a sample program.`,
  },
  {
    question: "Where are the ceremony and reception?",
    answer: `The ceremony will be held at ${wedding.ceremony}, Malabon. The reception follows at ${wedding.receptionFloor}, ${wedding.reception}, ${wedding.location}. You can find directions in the Location section.`,
  },
  { question: "What should I wear?", answer: `${attireDescription} Our pastel palette includes ${wedding.palette.map(({ name }) => name.toLowerCase()).join(", ")}. Men's attire: ${mensAttire}` },
  {
    question: "How do I RSVP?",
    answer: `${rsvpDeadline} For now, the RSVP form is a preview only. Replies are not sent or saved.`,
  },
  {
    question: "Do you have a gift registry?",
    answer: giftRegistries.length
      ? "Our registry links are in the Gift Registry section below. Your presence is our greatest gift."
      : "Your presence is our greatest gift. Our gift preferences and any registry details will be shared here soon. Thank you for thinking of us with so much love.",
  },
  {
    question: "Where can we share our wedding photos?",
    answer: `Share your favorite moments with ${wedding.hashtag} so we can relive the day together. You can copy the hashtag in the photo-sharing section above.`,
  },
];
