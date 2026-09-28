export type EntourageName = { name: string; needsReview?: boolean };
export type Photo = { src: string; alt: string };

// Names, date and venues are confirmed. Replace remaining pending details
// when supplied; never infer guest policies or logistics.
export const wedding = {
  slug: "vincent-and-gabrielle",
  title: "Vincent and Gabrielle",
  openingCaption: "Ours, evermore",
  bride: "Gabrielle Anne Santos",
  groom: "Vincent Gabriel Reyes",
  brideShort: "Gabrielle",
  groomShort: "Vincent",
  date: "20 February 2027",
  dateISO: "2027-02-20",
  ceremonyTime: "2:00 PM",
  // Saturday, 20 February 2027 at 2:00 PM in Manila (UTC+08:00).
  ceremonyISO: "2027-02-20T14:00:00+08:00",
  ceremony: {
    name: "San Agustin Church",
    address: "Intramuros, Manila",
    mapUrl: "https://maps.app.goo.gl/ijXS5wTjNYThgwXK6",
    mapEmbedUrl: null as string | null,
  },
  reception: {
    name: "La Castellana",
    introduction: "Reception to follow at",
    time: "5:00 PM",
    address: "Cabildo St., Intramuros",
    parking: null as string | null,
    mapUrl: "https://maps.app.goo.gl/AHZqgMUXheiZyqG29",
    mapEmbedUrl: null as string | null,
  },
  story: null as string | null,
  storyPhotos: [] as Photo[],
  galleryPhotos: [] as Photo[],
  hashtag: null as string | null,
  music: {
    title: "The One",
    artist: "Kodaline",
    src: "/vincent-and-gabrielle/music/the-one.mp3",
  } as { src: string | null; title: string; artist: string } | null,
  rsvpDeadline: "15 December 2026",
  contact: null as { name: string; href: string; label: string } | null,
  // Enable only after the owner provisions this event and its guest list.
  rsvpEnabled: false,
  rsvpQuestions: [
    {
      id: "song-request",
      question: "What song would you like to dance to?",
      placeholder: "Title and Artist",
      type: "text" as const,
    },
  ],
  gifts: {
    message:
      "Your presence is a gift in itself.\nShould you wish to give, a financial contribution toward our future together would be deeply appreciated.",
    registryMessage: "",
    registryUrl: null as string | null,
    registryQr: null as string | null,
  },
  saveTheDateVideo: {
    src: "/vincent-and-gabrielle/video/prenup-placeholder.mp4" as string | null,
    poster: undefined as string | undefined,
  },
};

export const attireDetails = {
  title: "The Dress Code",
  introduction: "We can't wait to celebrate with you in style.",
  formality: "Formal or Cocktail",
  colorFreedom: "Feel free to wear any color you feel best.",
  reservedShades: "white, cream, ivory and other white adjacent shades as it is reserved for the Bride.",
  weddingPartyColors: "green, orange, brown or yellow.",
  colorRequest: "Feel free to wear any color you feel best. Refrain from wearing green, orange, brown or yellow.",
};
