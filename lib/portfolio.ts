import type { StaticImageData } from "next/image";
import { getPhoto } from "@/app/ryan-and-anne/data/prenup-media";
import jaydeeBackground from "@/app/jaydee-and-bea/assets/designs/hero-watercolor-background.webp";
import jaydeeIllustration from "@/app/jaydee-and-bea/assets/designs/hero-couples.webp";
import { TreeDance, SunlitPortrait } from "@/app/anjo-and-jasmin/prenup-media";

export type PortfolioItem = {
 id: string; title: string; category: string; description: string; href: string;
 hidden?: boolean;
 bgImage: StaticImageData; previewImage: StaticImageData;
 accent: string; accentLight: string; tags: string[]; previewAlt?: string; previewFit?: "cover" | "contain";
};

function ryanPhoto(id: string): StaticImageData {
  const photo = getPhoto(id);
  return typeof photo.src === "string" ? { src: photo.src, width: photo.width, height: photo.height } : photo.src;
}
import stephHeroBg from "@/app/stephanie-at-18/assets/bg/hero-background.jpg";
import ericHeroBg from "@/app/eric-and-li/assets/hero-background.png";
import stephaniePhoto from "@/app/stephanie-at-18/assets/HeroPhoto.png";
import ericCoupleImg from "@/app/eric-and-li/assets/images/gallery-one-couple.jpg";
import isabellaBackground from "@/app/isabella-and-daniel/assets/romantic-couple.jpg";
import isabellaCouple from "@/app/isabella-and-daniel/assets/walking-couple.jpg";
import nylgenKerseeBackground from "@/app/nylgen-and-kersee/assets/sitting.jpg";
import nylgenKerseeCouple from "@/app/nylgen-and-kersee/assets/romantically-running.webp";
import joshuaBeaBackground from "@/app/joshua-and-bea/assets/images/prenup/pexels-king-caplis-471600979-36396174.jpg";
import joshuaBeaCouple from "@/app/joshua-and-bea/assets/images/prenup/pexels-king-caplis-471600979-36396110.jpg";
import vincentGabrielleBackground from "@/app/vincent-and-gabrielle/assets/prenup/bg-invite.jpg";
import vincentGabrielleCouple from "@/app/vincent-and-gabrielle/assets/prenup/Main1-2.jpg";

const invitationCatalog: PortfolioItem[] = [
  {
    id: "ryan-and-anne", title: "Ryan & Anne", category: "Wedding Invitation",
    hidden: true,
    description: "Envelope opening, love story, galleries, and RSVP.",
    href: "/ryan-and-anne", bgImage: ryanPhoto("cafe-overhead-portrait"), previewImage: ryanPhoto("cafe-doorway-facing-portrait"),
    accent: "#29251f", accentLight: "#f5f0e7", tags: ["Signature", "Editorial", "Black & Champagne"],
  },
  {
    id: "jaydee-and-bea", title: "Jaydee & Bea", category: "Wedding Invitation",
    hidden: true,
    description: "Floral illustrations, love story, and event details.",
    href: "/jaydee-and-bea", bgImage: jaydeeBackground, previewImage: jaydeeIllustration,
    previewAlt: "Garden couple illustration from Jaydee and Bea’s invitation",
    previewFit: "contain",
    accent: "#455f4b", accentLight: "#f7f4e9", tags: ["Signature", "Whimsical Garden", "Illustrated"],
  },
  {
    id: "anjo-and-jasmin", title: "Anjo & Jasmin", category: "Wedding Invitation",
    hidden: true,
    description: "Envelope opening, prenup film, galleries, love story, and RSVP.",
    href: "/anjo-and-jasmin", bgImage: TreeDance, previewImage: SunlitPortrait,
    accent: "#755b35", accentLight: "#f5f0e7", tags: ["Luxury", "Ivory & Gold", "Cinematic"],
  },
  {
    id: "vincent-and-gabrielle",
    title: "Vincent & Gabrielle",
    category: "Wedding Invitation",
    description:
      "Page-turn animations, photo slideshows, music, and countdown.",
    href: "/vincent-and-gabrielle",
    bgImage: vincentGabrielleBackground,
    previewImage: vincentGabrielleCouple,
    accent: "#4b502a",
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
    bgImage: joshuaBeaBackground,
    previewImage: joshuaBeaCouple,
    accent: "#52664d",
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
    bgImage: nylgenKerseeBackground,
    previewImage: nylgenKerseeCouple,
    accent: "#455f4b",
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
    bgImage: isabellaBackground,
    previewImage: isabellaCouple,
    accent: "#5a1024",
    accentLight: "#f6ebe8",
    tags: ["Modern Luxury", "Burgundy & Gold"],
  },
  {
    id: "stephanie-at-18",
    title: "Stephanie at 18",
    category: "18th Birthday Debut",
    description:
      "Dress guides, 18 roses and candles program, and RSVP.",
    href: "/stephanie-at-18",
    bgImage: stephHeroBg,
    previewImage: stephaniePhoto,
    accent: "#ac243d",
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
    bgImage: ericHeroBg,
    previewImage: ericCoupleImg,
    accent: "#4e2a0d",
    accentLight: "#f7efe4",
    tags: ["Luxury", "Coffee & Brown"],
  },
];

export const portfolioItems = invitationCatalog.filter((item) => !item.hidden);

