import { portfolioScreens, type InvitationScreens } from "./portfolio-screens";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  hidden?: boolean;
  accentLight: string;
  tags: string[];
  screens: InvitationScreens;
};

const invitationCatalog: Omit<PortfolioItem, "screens">[] = [
  {
    id: "christina-and-reboden",
    title: "Christina & Reboden",
    category: "Wedding Invitation",
    description: "Floral envelope opening, page-turn animations, love story, photo slideshow, music, and RSVP.",
    href: "https://christinaandrebodenwedding.moderninvites.com/",
    accentLight: "#f5eddf",
    tags: ["Enchanted Garden", "Dusty Blue & Blush"],
  },
  {
    id: "darell-and-roselle",
    title: "Darell & Roselle",
    category: "Wedding Invitation",
    description: "Woodland opening, animated monogram, event details, entourage, music, and RSVP.",
    href: "/darell-and-roselle",
    accentLight: "#f2ede0",
    tags: ["Woodland", "Olive & Ivory"],
  },
  {
    id: "ashley-at-18-rsvp",
    title: "Ashley at 18 RSVP",
    category: "18th Birthday Debut",
    description: "Pink florals, an ornate lavender frame, countdown, venue details, and open RSVP.",
    href: "/ashley-at-18-rsvp",
    accentLight: "#fcf4fa",
    tags: ["RSVP", "Pink & Lavender"],
  },
  {
    id: "marian-and-deejay",
    title: "Marian & Dee Jay",
    category: "Wedding Invitation",
    description: "Ribbon envelope opening, photo slideshows, prenup film, music, and RSVP.",
    href: "https://mariananddeejaywedding.moderninvites.com/",
    accentLight: "#fff8e8",
    tags: ["Signature", "Yellow & Brown"],
  },
  {
    id: "aljay-and-erlyn",
    title: "Aljay & Erlyn",
    category: "Wedding Invitation",
    description: "Garden opening, page-turn animations, love story, photo slideshows, music, and RSVP.",
    href: "https://aljayanderlynwedding.moderninvites.com/",
    accentLight: "#f2ede0",
    tags: ["Signature", "Olive & Ivory"],
  },
  {
    id: "edcel-and-apreal",
    title: "Edcel & Apreal",
    category: "Wedding Invitation",
    description:
      "Animated envelope opening, prenup film, love story, photo galleries, music, and RSVP.",
    href: "https://edcelandaprealwedding.moderninvites.com/",
    accentLight: "#e7c9cd",
    tags: ["Luxury", "Burgundy & Old Rose"],
  },
  {
    id: "mario-and-inah",
    title: "Mario & Inah",
    category: "Wedding Invitation",
    description:
      "Floral details, photo slideshows, music, and RSVP.",
    href: "https://marioandinahwedding.moderninvites.com",
    accentLight: "#f5f0e4",
    tags: ["Signature", "Pastel Garden"],
  },
  {
    id: "ryan-and-anne",
    title: "Ryan & Anne",
    category: "Wedding Invitation",
    description: "Envelope opening, love story, galleries, and RSVP.",
    href: "https://ryanandannewedding.moderninvites.com/",
    accentLight: "#f5f0e7",
    tags: ["Signature", "Editorial", "Black & Champagne"],
  },
  {
    id: "jaydee-and-bea",
    title: "Jaydee & Bea",
    category: "Wedding Invitation",
    description: "Floral illustrations, love story, and event details.",
    href: "https://jaydeeandbeawedding.moderninvites.com/",
    accentLight: "#f7f4e9",
    tags: ["Signature", "Whimsical Garden", "Illustrated"],
  },
  {
    id: "anjo-and-jasmin",
    title: "Anjo & Jasmin",
    category: "Wedding Invitation",
    hidden: true,
    description: "Envelope opening, prenup film, galleries, love story, and RSVP.",
    href: "/anjo-and-jasmin",
    accentLight: "#f5f0e7",
    tags: ["Luxury", "Ivory & Gold", "Cinematic"],
  },
  {
    id: "adi-and-jules",
    title: "Adi & Jules",
    category: "Wedding Invitation",
    description: "A romantic garden theme with an animated envelope opening, prenup film, photo galleries, love story, RSVP, and a reception seat finder.",
    href: "/adi-and-jules",
    accentLight: "#f5f0e7",
    tags: ["Luxury", "Seat Finder"],
  },
  {
    id: "vincent-and-gabrielle",
    title: "Vincent & Gabrielle",
    category: "Wedding Invitation",
    description:
      "Page-turn animations, photo slideshows, music, and countdown.",
    href: "/vincent-and-gabrielle",
    accentLight: "#f2ede0",
    tags: ["Signature Bundle", "Olive & Ivory"],
  },
  {
    id: "joshua-and-bea",
    title: "Joshua & Bea",
    category: "Wedding Invitation",
    description:
      "Love story, galleries, maps, music, and animations.",
    href: "/joshua-and-bea-wedding",
    accentLight: "#faf4f1",
    tags: ["Signature", "Pastel Garden"],
  },
  {
    id: "nylgen-and-kersee",
    title: "Nylgen & Kersee",
    category: "Wedding Invitation",
    description:
      "Botanical details, cinematic welcome, and RSVP.",
    href: "/nylgen-and-kersee",
    accentLight: "#f3f5ed",
    tags: ["Classic Bundle", "Botanical", "Ivory & Sage"],
  },
  {
    id: "isabella-and-daniel",
    title: "Isabella & Daniel",
    category: "Wedding Invitation",
    description:
      "Cinematic storytelling, music, and RSVP.",
    href: "/isabella-and-daniel",
    accentLight: "#f6ebe8",
    tags: ["Modern Luxury", "Burgundy & Gold"],
  },
  {
    id: "claudia-at-18",
    title: "Claudia at 18",
    category: "18th Birthday Debut",
    description: "Sapphire-blue styling, animated opening, photo gallery, and 18 traditions.",
    href: "/claudia-at-18",
    accentLight: "#e6edff",
    tags: ["18th Birthday", "Sapphire Blue"],
  },
  {
    id: "stephanie-at-18",
    title: "Stephanie at 18",
    category: "18th Birthday Debut",
    description:
      "Dress guides, 18 roses and candles program, and RSVP.",
    href: "/stephanie-at-18",
    accentLight: "#fff6d2",
    tags: ["18th Birthday", "Red & Yellow"],
  },
  {
    id: "eric-and-li",
    title: "Eric & Li",
    category: "Wedding Invitation",
    description:
      "Love story, countdown, attire guide, seat finder, and RSVP.",
    href: "/eric-and-li",
    accentLight: "#f7efe4",
    tags: ["Luxury", "Coffee & Brown"],
  },
];

export const portfolioItems: PortfolioItem[] = invitationCatalog
  .filter(item => !item.hidden)
  .map(item => {
    const screens = portfolioScreens[item.id];
    if (!screens) throw new Error(`Missing opening and hero captures for ${item.id}`);
    return { ...item, screens };
  });
