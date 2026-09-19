export type EntourageName = { name: string; needsReview?: boolean };
export type Photo = { src: string; alt: string };

export const attireDetails = {
  title: "Dressed to celebrate",
  introduction: "We can’t wait to celebrate with you in style.",
  formality: "Formal or Black-Tie Optional",
  colorRequest: "Please wear green, orange, or yellow.",
  colors: [
    { name: "Green", hex: "#5a6946" },
    { name: "Orange", hex: "#b86838" },
    { name: "Yellow", hex: "#c5a33c" },
  ],
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
  date: "January 28, 2027",
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
    `${attireDetails.introduction} We kindly request ${attireDetails.formality} attire. ${attireDetails.colorRequest} ${attireDetails.note}` as
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
      "Your presence is a gift in itself. Should you wish to give, a financial contribution toward our future together would be deeply appreciated.",
    registryMessage:
      "If you prefer to give a physical gift, our gift registry is available through the QR code on the gifts page.",
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
    note: "Include save the date video (c/o foreverlove)",
    src: "/videos/prenup.mp4",
  },
};

const name = (value: string, needsReview = false): EntourageName => ({
  name: value,
  needsReview,
});

export const entourage = {
  groomParents: [name("Engr. Julio B. Sergio"), name("Rhodora F. Sergio")],
  brideParents: [
    name("Engr. Lolito G. Zaldua"),
    name("Maria Theresa S. Zaldua"),
  ],
  // Keep the invitation's existing column order; spellings are confirmed by JSON.
  principal: [
    [name("Aldreneil S. San Jose"), name("Angelica C. San Jose")],
    [name("Engr. Sammy T. Yumul"), name("Engr. Lorna L. Yumul")],
    [name("Engr. Jeffrick T. Ditona"), name("Eva Z. Frivaldo")],
    [name("Robert C. Uy"), name("Helen Q. Diaz")],
    [name("Engr. Aries S. Grande"), name("Jeanette Z. Perea")],
  ],
  bestMan: [name("Vince C. San Jose")],
  maidOfHonor: [name("Leah Marie S. Zaldua")],
  secondary: [
    {
      role: "Candle",
      names: [name("Jan Vincent Q. Diaz"), name("Maila Coruna-Diaz")],
    },
    {
      role: "Veil",
      names: [name("Jordan R. Balane"), name("Louise Marie Z. Balane")],
    },
    {
      role: "Cord",
      names: [
        name("Engr. Vinraff O. Balcueba"),
        name("Engr. Imee P. Balcueba"),
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

export const faqs: { question: string; answer: string | null }[] = [
  {
    question: "When and where is the wedding?",
    answer:
      "Our wedding is on January 28, 2027. The ceremony begins at 1:00 PM at Chapel on the Hill, and the reception will be at Azienda Verde Alfonso.",
  },
  {
    question: "What time does the ceremony begin?",
    answer:
      "The ceremony begins at 1:00 PM. We'll share any additional arrival details here once they are confirmed.",
  },
  {
    question: "Where will we celebrate after the ceremony?",
    answer:
      "Our reception will be at Azienda Verde Alfonso. The reception start time will be shared here once confirmed.",
  },
  {
    question: "How can I RSVP?",
    answer:
      "Enter your complete invited name on the RSVP page and select ‘Find my invitation.’ Once your name is found on our guest list, a form will open for you to confirm attendance. The response deadline will be shared soon.",
  },
  {
    question: "When should I RSVP?",
    answer:
      "The RSVP deadline will be shared soon. We can’t wait to see you at the wedding!",
  },
  { question: "What is the dress code?", answer: wedding.attire },
  {
    question: "Can I bring a plus one?",
    answer:
      "Our numbers are really tight so we’re only able to accommodate the guests listed on the invite. Thank you for understanding.",
  },
  {
    question: "Are children invited?",
    answer:
      "We’ve decided to keep the wedding adults-only. We hope you can still join us for a well-earned night off!",
  },
  { question: "Is parking or transportation available?", answer: null },
  { question: "May we take photos during the ceremony?", answer: null },
  {
    question: "Is there a gift registry?",
    answer: `${wedding.gifts.message} ${wedding.gifts.registryMessage}`,
  },
  { question: "Whom can I contact with other questions?", answer: null },
];
