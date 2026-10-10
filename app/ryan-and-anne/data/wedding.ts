export const wedding = {
  slug: "ryan-and-anne",
  title: "Ryan & Anne",
  bride: "Jobelle Anne Paraiso",
  groom: "Ryan Pantoja",
  brideShort: "Anne",
  groomShort: "Ryan",
  date: "November 22, 2026",
  dateISO: "2026-11-22",
  timezone: "Asia/Manila",
  locationLabel: "Tayabas City & Lucena City, Quezon",
  ceremonyTime: "02:00 PM",
  ceremonyISO: "2026-11-22T14:00:00+08:00",
  ceremony: {
    name: "St. Joseph Spouse of Mary Church",
    address: "Avida, Brgy. Isabang, Tayabas City, Quezon",
    mapUrl: null as string | null,
  },
  reception: {
    name: "Lutgarda’s",
    address:
      "2205 Suites by East Orient, Gomez Extension Brgy. Ilayang Iyam, Lucena City, Lucena, Philippines, 4301",
    time: null as string | null,
    mapUrl: null as string | null,
  },
  hashtag: "#ParadiseToPantoja",
  rsvpDeadline: "November 14, 2026",
  rsvpDeadlineISO: "2026-11-14",
  rsvpEventSlug: "ryan-and-anne",
  music: {
    title: "You’re Still The One",
    artist: "Shania Twain",
    src: "https://assets.moderninvites.com/ryan-and-anne/music/Shania%20Twain%20-%20You%27re%20Still%20The%20One%20%28Lyrics%29.mp3" as
      | string
      | null,
  },
};

const ceremonyDate = new Date(wedding.ceremonyISO);
const formatDate = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: wedding.timezone,
  }).format(ceremonyDate);

export const dateLabels = {
  weekday: formatDate({ weekday: "long" }),
  day: formatDate({ day: "2-digit" }),
  monthYear: formatDate({ month: "long", year: "numeric" }),
  short: [
    formatDate({ day: "2-digit" }),
    formatDate({ month: "2-digit" }),
    formatDate({ year: "2-digit" }),
  ].join(" · "),
  schedule: [
    formatDate({ day: "2-digit" }),
    formatDate({ month: "short" }),
    formatDate({ year: "numeric" }),
  ].join(" "),
};

export const designPreferences = {
  theme: "Moody",
  inspiration: "Elegant, minimalist",
  colors: ["Black", "Champagne Gold", "Ivory"],
};

export const timeline = [
  { time: "01:30 PM", label: "Guest Arrival" },
  { time: "02:00 PM", label: "Ceremony" },
  { time: "03:00 PM", label: "Photographs" },
  { time: "04:30 PM", label: "Cocktail Hour" },
];

export const attireDetails = {
  formality: "Formal or Cocktail Attire",
  paragraphs: [
    "We kindly encourage our guests to dress in Formal or Cocktail Attire, with touches of our wedding colors to beautifully complement our special day.",
    "Please choose an outfit that makes you feel comfortable, confident, and celebration-ready. We want you to look and feel your best as we celebrate this special day together.",
  ],
  restrictions: null as string | null,
};
