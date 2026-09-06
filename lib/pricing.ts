export type PackageId = "classic" | "signature" | "luxury";

export type PricingPackage = {
  id: PackageId;
  name: string;
  tagline: string;
  description: string;
  price: string;
  features: string[];
  featured?: boolean;
  bestFor: string;
  highlight: string;
};

export type ModularFeature = {
  name: string;
  description: string;
  price: string;
};

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "classic",
    name: "Classic",
    tagline: "Everything you need to get started",
    description:
      "The essentials for a polished, shareable celebration website.",
    price: "799",
    bestFor: "Simple, polished celebrations",
    highlight: "Essential event details",
    features: [
      "Event Details Section (Date, Time, Place, Venue)",
      "Countdown Timer",
      "Photo Gallery (1 Section)",
      "Maximum 10 Photos",
      "Dress Code Section",
      "Program / Entourage Section",
      "Event Hashtag Section",
      "RSVP (No Restriction)",
      "Guest Management Portal",
      "Mobile-Friendly Design",
      "Shareable via Messenger, Facebook & QR Code",
      "1 Revision Round",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    tagline: "The most loved package for couples",
    description:
      "A richer, story-led invitation with immersive details and interactions.",
    price: "1,999",
    featured: true,
    bestFor: "Story-rich weddings and events",
    highlight: "Music, maps, and premium motion",
    features: [
      "Everything in Classic plus:",
      "Custom Design Theme",
      "Story / About Us Section",
      "Event Timeline",
      "Google Maps Integration",
      "Photo Gallery (2 Sections)",
      "Maximum 30 Photos",
      "1 Background Music",
      "RSVP (with Restrictions) + Client Portal",
      "Premium Animations & Effects",
      "Smooth Scroll Experience",
      "3 Revision Rounds",
    ],
  },
  {
    id: "luxury",
    name: "Luxury",
    tagline: "A fully bespoke, white-glove experience",
    description:
      "A deeply personalized invitation for celebrations with more to share.",
    price: "3,499",
    bestFor: "Bespoke, detail-rich celebrations",
    highlight: "Custom RSVP, video, and priority support",
    features: [
      "Everything in Signature plus:",
      "Fully Custom Design",
      "Maximum 50 Photos",
      "Up to 4 Background Music",
      "Gift Registry Section",
      "FAQ Section",
      "Video Integration",
      "Custom RSVP Questions",
      "RSVP (with Restrictions) + Client Portal + Passcode Protection",
      "Seat Finder with Admin Dashboard",
      "Priority Support",
      "5–10 Design Revision Rounds",
    ],
  },
];

export const MODULAR_FEATURES: ModularFeature[] = [
  {
    name: "Event Details Section",
    description: "Date, time, place, and venue details",
    price: "199",
  },
  {
    name: "Countdown Timer",
    description: "Live countdown to your celebration",
    price: "149",
  },
  {
    name: "Photo Gallery",
    description: "One curated photo gallery section",
    price: "249",
  },
  {
    name: "Dress Code Section",
    description: "Attire guide, colors, and inspiration",
    price: "149",
  },
  {
    name: "Program / Entourage",
    description: "Event program or entourage listing",
    price: "249",
  },
  {
    name: "Event Hashtag",
    description: "A dedicated, shareable hashtag section",
    price: "99",
  },
  {
    name: "RSVP + Client Portal",
    description: "Unlimited responses and guest management",
    price: "599",
  },
  {
    name: "Story / About Us",
    description: "A personal story section with photos",
    price: "249",
  },
  {
    name: "Event Timeline",
    description: "A visual schedule of event moments",
    price: "249",
  },
  {
    name: "Google Maps",
    description: "Interactive map and venue directions",
    price: "149",
  },
  {
    name: "Background Music",
    description: "One selected track with playback control",
    price: "199",
  },
  {
    name: "Premium Animations",
    description: "Enhanced transitions and visual effects",
    price: "349",
  },
  {
    name: "Gift Registry",
    description: "Gift preferences and registry links",
    price: "199",
  },
  {
    name: "FAQ Section",
    description: "Answers to your guests’ common questions",
    price: "149",
  },
  {
    name: "Video Integration",
    description: "Embed one hosted event video",
    price: "249",
  },
  {
    name: "Custom RSVP Questions",
    description: "Collect details specific to your event",
    price: "249",
  },
  {
    name: "Seat Finder with Admin Dashboard",
    description: "Let guests look up their table assignment",
    price: "499",
  },
  // {
  //   name: "Video Save-the-Date",
  //   description: "A custom short-form announcement video",
  //   price: "999",
  // },
  {
    name: "Custom Design Theme",
    description: "Personalized colors, type, and visual styling",
    price: "499",
  },
  {
    name: "Additional Revision Round",
    description: "One extra consolidated design revision",
    price: "250",
  },
];
