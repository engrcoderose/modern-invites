type Person = {
  name: string;
  needsConfirmation?: boolean;
};

type WeddingPartyGroup = {
  role: string;
  people: Person[];
};

type TimelineItem = {
  time: string;
  title: string;
  details?: string[];
};

export type GalleryAssetKey = "sitting" | "walking" | "running" | "rings";

export type WeddingData = {
  meta: {
    slug: string;
    title: string;
    description: string;
  };
  couple: {
    groom: { firstName: string; fullName: string; familyName: string };
    bride: { firstName: string; fullName: string; familyName: string };
    monogram: string;
    tagline: string;
  };
  invitation: {
    message: string[];
  };
  event: {
    dateISO: string;
    dateTimeISO: string;
    dateDisplay: string;
    ceremonyTime: string;
    receptionTime: string;
    ceremony: {
      name: string;
      address: string | null;
      mapUrl: string | null;
    };
    reception: {
      name: string;
      address: string | null;
      mapUrl: string | null;
    };
  };
  gallery: Array<{
    id: string;
    asset: GalleryAssetKey;
    alt: string;
    caption: string;
    position?: string;
  }>;
  weddingParty: WeddingPartyGroup[];
  principalSponsors: Array<{
    sponsorOne: Person;
    sponsorTwo: Person;
  }>;
  giftGuide: {
    heading: string;
    message: string;
  };
  timeline: TimelineItem[];
  socialSharing: {
    message: string;
    hashtag: string;
    albumUrl: string | null;
    uploadPath: string;
    qrCodeAsset: string | null;
  };
  rsvp: {
    heading: string;
    message: string;
    deadlineISO: string;
    deadlineDisplay: string;
    confirmationMessage: string;
  };
  attire: {
    heading: string;
    dressCode: string;
    message: string;
    palette: Array<{ name: string; hex: string }>;
  };
};

export const weddingData = {
  meta: {
    slug: "nylgen-and-kersee",
    title: "Nylgen & Kersee",
    description:
      "A botanical, ivory-and-sage wedding invitation for Nylgen and Kersee.",
  },
  couple: {
    groom: {
      firstName: "Nylgen",
      fullName: "Nylgen Maghirang",
      familyName: "Maghirang",
    },
    bride: {
      firstName: "Kersee",
      fullName: "Kersee Ferrer",
      familyName: "Ferrer",
    },
    monogram: "N & K",
    tagline: "two lives intertwined as one",
  },
  invitation: {
    message: [
      "Our hearts became one in 2024.",
      "Now, with love-filled hearts, we invite you to witness us reaffirming our vows before God, surrounded by the love of friends and family.",
    ],
  },
  event: {
    dateISO: "2027-02-27",
    dateTimeISO: "2027-02-27T14:00:00+08:00",
    dateDisplay: "February 27, 2027, Saturday",
    ceremonyTime: "2 o'clock in the afternoon",
    receptionTime: "4 o'clock in the afternoon",
    ceremony: {
      name: "Nuestra Señora Delos Remedios Parish",
      address: "Mercury St., ADB Subdivision, Brgy. Del Remedio, San Pablo City",
      mapUrl: null,
    },
    reception: {
      name: "E.M. Resort",
      address: "Sta. Filomena, San Pablo City",
      mapUrl: null,
    },
  },
  gallery: [
    {
      id: "lakeside-promise",
      asset: "sitting",
      alt: "Nylgen offering flowers to Kersee beside the lake",
      caption: "A promise by the water",
      position: "50% 46%",
    },
    {
      id: "walking-together",
      asset: "walking",
      alt: "Nylgen and Kersee walking together",
      caption: "Every road, together",
    },
    {
      id: "running-toward-forever",
      asset: "running",
      alt: "Nylgen and Kersee sharing a playful moment outdoors",
      caption: "Joy in every step",
      position: "50% 58%",
    },
    {
      id: "wedding-rings",
      asset: "rings",
      alt: "The couple's wedding rings in a blush ring box",
      caption: "The promise we carry",
      position: "50% 72%",
    },
  ],
  weddingParty: [
    {
      role: "Groom's Parents",
      people: [
        { name: "Gener B. Maghirang Jr." },
        { name: "Lorelyn B. Maghirang" },
      ],
    },
    {
      role: "Bride's Parents",
      people: [
        { name: "Gerald A. Ferrer" },
        { name: "Imelda A. Ferrer" },
      ],
    },
    {
      role: "Best Man",
      people: [{ name: "Justin Emil B. Maghirang" }],
    },
    {
      role: "Maid of Honor",
      people: [{ name: "Kirsten A. Ferrer" }],
    },
    {
      role: "Cord",
      people: [
        { name: "Kyrie Eleison A. Ferrer" },
        { name: "Wenn Elym C. Ferrer" },
      ],
    },
    {
      role: "Candle",
      people: [
        { name: "Amando Santos IV" },
        { name: "Maidy Santos-Satorre" },
      ],
    },
    {
      role: "Veil",
      people: [
        { name: "Keanne Paul Jarren Bondad" },
        { name: "Jazelle Gwen Nicole B. Maghirang" },
      ],
    },
    {
      role: "Little Groom",
      people: [{ name: "Juancho Sebastian C. Ferrer" }],
    },
    {
      role: "Little Bride",
      people: [{ name: "Elmira Maghirang" }],
    },
    {
      role: "Flower Girls",
      people: [
        { name: "Lizzy Kiara Anlacan" },
        { name: "Amara Maghirang" },
        { name: "Amari Anlacan" },
      ],
    },
    {
      role: "Ring Bearer",
      people: [{ name: "Miguel Maghirang" }],
    },
    {
      role: "Bible Bearer",
      people: [{ name: "Kylo Anlacan" }],
    },
    {
      role: "Coin Bearer",
      people: [{ name: "Charlie Jeshua Betus" }],
    },
  ],
  principalSponsors: [
    {
      sponsorOne: { name: "Mr. Amado Anlacan Jr." },
      sponsorTwo: { name: "Mrs. Arleen Anlacan" },
    },
    {
      sponsorOne: { name: "Mr. Arnel Cosinas" },
      sponsorTwo: { name: "Mrs. Maria Melanie Cosinas" },
    },
    {
      sponsorOne: { name: "Mr. Carmelo Maghirang" },
      sponsorTwo: { name: "Mrs. Emerita Maghirang" },
    },
    {
      sponsorOne: { name: "Mr. Elmer Maghirang" },
      sponsorTwo: { name: "Mrs. Fannie Maghirang" },
    },
    {
      sponsorOne: { name: "Mr. Ismael Bondad" },
      sponsorTwo: { name: "Mrs. Karyl Ann Bondad" },
    },
    {
      sponsorOne: { name: "Mr. Jimmy De Mesa" },
      sponsorTwo: { name: "Mrs. Lucy De Mesa" },
    },
    {
      sponsorOne: { name: "Mr. Lorenzo Atienza" },
      sponsorTwo: { name: "Mrs. Gemma Fontanilla" },
    },
    {
      sponsorOne: { name: "Mr. Philip Jones Berguila" },
      sponsorTwo: { name: "Mrs. Amihan Bondad" },
    },
    {
      sponsorOne: { name: "Mr. Teejay Allan Ciar" },
      sponsorTwo: { name: "Mrs. Rovelyn Ciar" },
    },
  ],
  giftGuide: {
    heading: "Gift Guide",
    message:
      "Your presence is the most treasured gift of all. Should you wish to extend a further gesture of goodwill, a monetary gift would be appreciated and will contribute towards our future together.",
  },
  timeline: [
    { time: "2:00 PM", title: "Ceremony starts" },
    { time: "3:30 PM", title: "Pica-pica" },
    { time: "4:00 PM", title: "Reception begins" },
    { time: "5:00 PM", title: "Dinner" },
    {
      time: "5:30 PM",
      title: "Cake cutting",
      details: ["Wine toasting"],
    },
    {
      time: "6:00 PM",
      title: "Father and daughter dance",
      details: ["Prosperity dance"],
    },
    { time: "6:30 PM onwards", title: "After party" },
  ],
  socialSharing: {
    message:
      "We would love for you to capture and share your moments from our special day. Use our wedding hashtag or scan the QR code to upload your photos to our album.",
    hashtag: "#NYLGENfoundhisKERSEEyahan",
    albumUrl: null,
    uploadPath: "/nylgen-and-kersee#photo-upload",
    qrCodeAsset: null,
  },
  rsvp: {
    heading: "We would love to celebrate with you!",
    message:
      "Kindly let us know if you can join us by submitting the form.",
    deadlineISO: "2027-01-27",
    deadlineDisplay: "January 27, 2027",
    confirmationMessage:
      "Thank you for responding. We cannot wait to celebrate with you.",
  },
  attire: {
    heading: "Wedding Attire Guide",
    dressCode: "Formal attire; long dresses for the ladies",
    message:
      "We kindly encourage our guests to wear formal attire, with these colors to match our special day.",
    palette: [
      { name: "Garden green", hex: "#5D8D3F" },
      { name: "Soft sage", hex: "#A1CC9B" },
      { name: "Warm marigold", hex: "#F0C874" },
      { name: "Champagne ivory", hex: "#F9ECCD" },
    ],
  },
} as const satisfies WeddingData;
