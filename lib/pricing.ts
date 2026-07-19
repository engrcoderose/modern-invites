export type PackageId = "classic" | "signature" | "luxury";

export type PricingPackage = {
  id: PackageId;
  name: string;
  tagline: string;
  description: string;
  price: string;
  originalPrice: string;
  features: string[];
  featured?: boolean;
  bestFor: string;
  highlight: string;
};

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "classic",
    name: "Classic",
    tagline: "Everything you need to get started",
    description:
      "The essentials for a polished, shareable celebration website.",
    price: "799",
    originalPrice: "999",
    bestFor: "Simple, polished celebrations",
    highlight: "Essential event details",
    features: [
      "Custom Invitation Link",
      "Event Details Section",
      "RSVP Form",
      "Photo Gallery (Up to 10 Photos)",
      "Dress Code Section",
      "Program / Entourage Section",
      "Event Hashtag Section",
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
    originalPrice: "2,499",
    featured: true,
    bestFor: "Story-rich weddings and events",
    highlight: "Music, maps, and premium motion",
    features: [
      "Everything in Classic",
      "Custom Design Theme",
      "Story / About Us Section",
      "Countdown Timer",
      "Google Maps Integration",
      "Photo Gallery (Up to 50 Photos)",
      "Background Music",
      "Save-the-Date Section",
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
    originalPrice: "3,999",
    bestFor: "Bespoke, detail-rich celebrations",
    highlight: "Custom RSVP, video, and priority support",
    features: [
      "Everything in Signature",
      "Fully Custom Design",
      "Event Timeline",
      "Gift Registry Section",
      "FAQ Section",
      "Video Integration",
      "Custom RSVP Questions",
      "Priority Support",
      "Free Ready-to-Print Invitation Layout",
      "Unlimited Design Revisions",
    ],
  },
];

export const LAUNCH_DISCOUNT = "20% off";
