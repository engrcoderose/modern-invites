export type EntourageName = { name: string; needsReview?: boolean };
export type Photo = { src: string; alt: string };

export const attireDetails = {
  title: "The Dress Code",
  formality: "Formal or Black-Tie Optional",
  colorRequest: "Please wear green, orange, or yellow.",
  note: "Kindly avoid white, cream, ivory, and other white-adjacent shades.",
};

// Updated from the client-supplied LESLIE AND SERJ JSON. Citation markers are
// extraction artifacts, not guest-facing copy. Null fields remain unconfirmed.
// Reference URLs describe requested assets; they are not playable media URLs.
export const wedding = {
  title: "Leslie and Serj",
  bride: "Leslie Marie S. Zaldua",
  groom: "John Rey F. Sergio",
  brideShort: "Leslie Marie",
  groomShort: "John Rey",
  date: "28 January 2027",
  dateISO: "2027-01-28",
  ceremonyTime: "1:00 PM",
  // 1:00 PM at the Philippine ceremony venue (UTC+08:00).
  ceremonyISO: "2027-01-28T13:00:00+08:00",
  ceremony: {
    name: "Chapel on the Hill",
    address: "Batulao Rd, Calaca, Don Bosco, Nasugbu, 4231 Batangas" as
      | string
      | null,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Chapel%20on%20the%20Hill%2C%20Batulao%20Road%2C%20Batangas",
    mapEmbedUrl: null as string | null,
  },
  reception: {
    name: "Azienda Verde Alfonso",
    time: null as string | null,
    address: "Del Pilar St., Poblacion 5 4123 Alfonso" as string | null,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Azienda%20Verde%20Alfonso%2C%20Del%20Pilar%20Street%2C%20Alfonso",
    mapEmbedUrl: null as string | null,
  },
  story: null as string | null,
  storyPhotos: [] as Photo[],
  galleryPhotos: [] as Photo[],
  attire:
    `${attireDetails.formality} attire. ${attireDetails.colorRequest} ${attireDetails.note}` as
      | string
      | null,
  hashtag: null as string | null,
  music: {
    title: "The One",
    artist: "Kodaline",
    src: "/leslie-and-serj/Kodaline%20-%20The%20One.mp3",
  } as { src: string | null; title: string; artist: string } | null,
  rsvpDeadline: null as string | null,
  contact: null as { name: string; href: string; label: string } | null,
  // This is an input requested by the client, not an answered FAQ.
  rsvpQuestions: [
    {
      id: "song-request",
      question: "What song would you like to dance to?",
      type: "text" as const,
      placeholder: "Title and Artist",
    },
  ],
  gifts: {
    message:
      "Your presence is a gift. A contribution toward our future together would be deeply appreciated.",
    registryMessage:
      "For physical gifts, please scan our registry QR code below.",
    registryUrl: null as string | null,
  },
  design: {
    theme: "Moody, Romantic, Vintage, with touch of whimsy",
    colorPalette: "Olive Green, Ivory White",
    colors: { oliveGreen: "#5a6946", ivoryWhite: "#f2ede0" },
    notes: "Utilize white space. See sample website",
    navigation: "horizontal/swipe not vertical/scroll",
    fonts: {
      headers: {
        name: "Anastasia",
        referenceUrl: "https://fontsgeek.com/fonts/AnastasiaScript-Regular",
      },
      body: {
        name: "Noto Serif",
        referenceUrl: "https://fonts.google.com/noto/specimen/Noto+Serif",
      },
    },
    referenceUrl:
      "https://www.etsy.com/listing/4550839312/swan-lake-one-click-old-money-wedding?ls=s&ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=wedding+website+old+money+swipe+motion&ref=sr_gallery-1-2&pro=1&sts=1&dd=1&content_source=b70beb02-f899-4c93-a078-156153329837%253ALTa51b7a5f60e0ec140a822a68dfe774605085fc14&organic_search_click=1&logging_key=b70beb02-f899-4c93-a078-156153329837%3ALTa51b7a5f60e0ec140a822a68dfe774605085fc14",
  },
  assets: {
    driveFolderUrl:
      "https://drive.google.com/drive/folders/1g3OWZXi5Y3kVPcVNde0XN5njwBqZIBsN?usp=sharing",
    photosProvidedBy: "Foreverlove",
  },
  saveTheDateVideo: {
    text: "The countdown begins",
    providedBy: "Foreverlove",
    note: "Save the Date Video - Leslie and Serj.mov",
    src: "/leslie-and-serj/video/save-the-date.mp4",
    poster: "/leslie-and-serj/video/save-the-date-poster.jpg",
  },
};

const name = (value: string, needsReview = false): EntourageName => ({
  name: value,
  needsReview,
});

export const entourage = {
  groomParents: [name("Rhodora F. Sergio"), name("Engr. Julio B. Sergio")],
  brideParents: [
    name("Maria Theresa S. Zaldua"),
    name("Engr. Lolito G. Zaldua"),
  ],
  // Women precede men in each pair; preserve the confirmed names and pairings.
  principal: [
    [name("Angelica C. San Jose"), name("Aldreneil S. San Jose")],
    [name("Engr. Lorna L. Yumul"), name("Engr. Sammy T. Yumul")],
    [name("Eva Z. Frivaldo"), name("Engr. Jeffrick T. Ditona")],
    [name("Helen Q. Diaz"), name("Robert C. Uy")],
    [name("Jeanette Z. Perea"), name("Engr. Aries S. Grande")],
  ],
  bestMan: [name("Vince C. San Jose")],
  maidOfHonor: [name("Leah Marie S. Zaldua")],
  secondary: [
    {
      role: "Candle",
      names: [name("Maila Coruna-Diaz"), name("Jan Vincent Q. Diaz")],
    },
    {
      role: "Veil",
      names: [name("Louise Marie Z. Balane"), name("Jordan R. Balane")],
    },
    {
      role: "Cord",
      names: [
        name("Engr. Imee P. Balcueba"),
        name("Engr. Vinraff O. Balcueba"),
      ],
    },
  ],
  groomsmen: [
    name("Karlos Miguel A. Bautista"),
    name("Fritzgerald M. Feudo"),
    name("Atty. Sean Andre Ramirez"),
  ],
  bridesmaids: [
    name("Abigail E. Andrada"),
    name("Mary Ryaette Colibao"),
    name("Marianne Carmen R. Palle"),
  ],
  bearers: [
    { role: "Ring Bearer", names: [name("Oliver John R. Arenas")] },
    { role: "Bible Bearer", names: [name("Justin Regan F. Sergio")] },
    { role: "Coin Bearer", names: [name("Levi Maynard D. Igot")] },
  ],
  flowers: [
    name("Jillian Rose F. Sergio"),
    name("Al John B. Martinez"),
    name("Leandro A. De Torres"),
  ],
};

export const faqs: { question: string; answer: string | null; link?: { href: string; label: string } }[] = [
  {
    question: "Can I bring a plus one?",
    answer:
      "We can accommodate only the guests named on your invitation. Thank you for understanding.",
  },
  {
    question: "Are children invited?",
    answer:
      "Our wedding is an adults-only celebration.",
  },
  { question: "Is parking or transportation available?", answer: null },
  { question: "May we take photos during the ceremony?", answer: null },
  {
    question: "Is there a gift registry?",
    answer: "Yes. You can find our registry under",
    link: { href: "#gifts", label: "A Note on Gifts" },
  },
  { question: "Whom can I contact with other questions?", answer: null },
];
