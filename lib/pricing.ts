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
  category: "design" | "guests";
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
      "Image Opening Screen",
      "Event Details Section (Date, Time, Place, Venue)",
      "Countdown Timer",
      "Dress Code Section",
      "Program / Entourage Section",
      "Event Hashtag Section",
      "RSVP (No Restriction)",
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
    price: "1,499",
    featured: true,
    bestFor: "Story-rich weddings and events",
    highlight: "Music, maps, and premium motion",
    features: [
      "Everything in Classic plus:",
      "Animated Envelope Opening Screen",
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
    price: "3,199",
    bestFor: "Bespoke, detail-rich celebrations",
    highlight: "Custom RSVP, video, and priority support",
    features: [
      "Everything in Signature plus:",
      "Fully Custom Design",
      "Maximum 50 Photos",
      "Up to 4 Background Music",
      "Gift Registry Section",
      "Where to Stay / Guest Guide Section",
      "FAQ Section",
      "Prenup Video Integration",
      "Custom RSVP Questions",
      "RSVP (with Restrictions) + Client Portal + Passcode Protection",
      "Seat Finder with Admin Dashboard",
      "Priority Support",
      "5 Revision Rounds",
    ],
  },
];

export const MODULAR_FEATURES: ModularFeature[] = [
  {
    name: "Photo Gallery Section",
    description: "One curated photo gallery section",
    price: "199",
    category: "design",
  },
  {
    name: "Story / About Us",
    description: "A personal story section with photos",
    price: "199",
    category: "design",
  },
  {
    name: "Event Timeline",
    description: "A visual schedule of event moments",
    price: "199",
    category: "design",
  },
  {
    name: "Google Maps",
    description: "Interactive map and venue directions",
    price: "199",
    category: "guests",
  },
  {
    name: "Background Music",
    description: "One selected track with playback control",
    price: "199",
    category: "design",
  },
  {
    name: "Premium Animations",
    description: "Enhanced transitions and visual effects",
    price: "349",
    category: "design",
  },
  {
    name: "Animated Envelope",
    description: "An animated envelope opening for your invitation",
    price: "349",
    category: "design",
  },
  {
    name: "Gift Registry",
    description: "Gift preferences and registry links",
    price: "199",
    category: "guests",
  },
  {
    name: "FAQ Section",
    description: "Answers to your guests’ common questions",
    price: "199",
    category: "guests",
  },
  {
    name: "Where to Stay / Guest Guide Section",
    description: "Accommodation suggestions and practical guest information",
    price: "199",
    category: "guests",
  },
  {
    name: "Prenup Video Integration",
    description: "Embed one hosted prenup video",
    price: "249",
    category: "design",
  },
  {
    name: "Custom RSVP Questions",
    description: "Collect details specific to your event",
    price: "249",
    category: "guests",
  },
  {
    name: "RSVP with Person Limit",
    description: "Set a person limit for RSVP responses",
    price: "399",
    category: "guests",
  },
  {
    name: "Seat Finder with Admin Dashboard",
    description: "Let guests look up their table assignment",
    price: "499",
    category: "guests",
  },
  {
    name: "Custom Design Theme",
    description: "Personalized colors, type, and visual styling",
    price: "499",
    category: "design",
  },
  {
    name: "Additional Revision Round",
    description: "One extra consolidated design revision",
    price: "250",
    category: "design",
  },
];
