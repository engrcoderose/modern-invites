export type EntourageName = { name: string; needsReview?: boolean };
export type Photo = { src: string; alt: string };

// Names, date and venues are confirmed. Replace remaining pending details
// when supplied; never infer guest policies or logistics.
export const wedding = {
  slug: "oliver-and-precious",
  title: "Oliver & Precious",
  openingCaption: "Ours, evermore",
  bride: "Precious Josiebel Duane Lyn M. Tangunan",
  groom: "Oliver E. Bartolome",
  brideShort: "Precious",
  groomShort: "Oliver",
  date: "18 March 2026",
  dateISO: "2026-03-18",
  ceremonyTime: "3:00 PM",
  // Wednesday, 18 March 2026 at 3:00 PM in Philippine time (UTC+08:00).
  ceremonyISO: "2026-03-18T15:00:00+08:00",
  ceremony: {
    name: "Cove Garden",
    address: "Cagayan de Oro",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Cove+Garden+Cagayan+de+Oro",
    mapEmbedUrl: null as string | null,
  },
  reception: {
    name: "Cove Garden (Talisay Pavillion)",
    introduction: "Reception to follow at",
    time: "7:00 PM",
    address: "Cagayan de Oro",
    parking: "Parking is available at the venue." as string | null,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Cove+Garden+Talisay+Pavillion+Cagayan+de+Oro",
    mapEmbedUrl: null as string | null,
  },
  story: null as string | null,
  storyPhotos: [] as Photo[],
  galleryPhotos: [] as Photo[],
  hashtag: null as string | null,
  music: null as { src: string | null; title: string; artist: string } | null,
  rsvpDeadline: null as string | null,
  contact: null as { name: string; href: string; label: string } | null,
  // Enable only after the owner provisions this event and its guest list.
  rsvpEnabled: false,
  rsvpQuestions: [] as { id: string; question: string; placeholder: string; type: "text" }[],
  gifts: {
    message:
      "Your presence is a gift in itself.\nShould you wish to give, a financial contribution toward our future together would be deeply appreciated.",
    registryMessage: "A gift QR code will be shared here soon.",
    registryUrl: null as string | null,
    registryQr: null as string | null,
  },
};

export const attireDetails = {
  title: "The Dress Code",
  introduction: "We look forward to celebrating with you.",
  formality: "Semi-formal attire for guests",
  colorFreedom: "Please wear beige or light brown tones.",
  reservedShades: "",
  weddingPartyColors: "",
  colorRequest: "Guests: semi-formal attire in beige or light brown. Principal sponsors: formal attire in shades of blue.",
  sponsors: "Principal sponsors are kindly requested to wear formal attire in shades of blue.",
};

export const timeline = [
  { time: "2:30 PM", title: "Guest Arrival", detail: "Please arrive and settle in before the ceremony." },
  { time: "3:00–5:00 PM", title: "Wedding Ceremony", detail: "Cove Garden, Cagayan de Oro" },
  { time: "6:00 PM", title: "Refreshments & Cocktail Hour", detail: "Enjoy refreshments as we begin the celebration." },
  { time: "7:00–9:00 PM", title: "Reception", detail: "Cove Garden (Talisay Pavillion)" },
];
