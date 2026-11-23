import type { StaticImageData } from "next/image";
import adiAndJulesHero from "@/components/portfolio/assets/screens/adi-and-jules-hero.webp";
import adiAndJulesOpening from "@/components/portfolio/assets/screens/adi-and-jules-opening.webp";
import aljayAndErlynHero from "@/components/portfolio/assets/screens/aljay-and-erlyn-hero.webp";
import aljayAndErlynOpening from "@/components/portfolio/assets/screens/aljay-and-erlyn-opening.webp";
import ashleyAt18RsvpHero from "@/components/portfolio/assets/screens/ashley-at-18-rsvp-hero.webp";
import christinaAndRebodenHero from "@/components/portfolio/assets/screens/christina-and-reboden-hero.webp";
import christinaAndRebodenOpening from "@/components/portfolio/assets/screens/christina-and-reboden-opening.webp";
import claudiaAt18Hero from "@/components/portfolio/assets/screens/claudia-at-18-hero.webp";
import claudiaAt18Opening from "@/components/portfolio/assets/screens/claudia-at-18-opening.webp";
import darellAndRoselleHero from "@/components/portfolio/assets/screens/darell-and-roselle-hero.webp";
import darellAndRoselleOpening from "@/components/portfolio/assets/screens/darell-and-roselle-opening.webp";
import edcelAndAprealHero from "@/components/portfolio/assets/screens/edcel-and-apreal-hero.webp";
import edcelAndAprealOpening from "@/components/portfolio/assets/screens/edcel-and-apreal-opening.webp";
import ericAndLiHero from "@/components/portfolio/assets/screens/eric-and-li-hero.webp";
import ericAndLiOpening from "@/components/portfolio/assets/screens/eric-and-li-opening.webp";
import isabellaAndDanielHero from "@/components/portfolio/assets/screens/isabella-and-daniel-hero.webp";
import isabellaAndDanielOpening from "@/components/portfolio/assets/screens/isabella-and-daniel-opening.webp";
import jaydeeAndBeaHero from "@/components/portfolio/assets/screens/jaydee-and-bea-hero.webp";
import jaydeeAndBeaOpening from "@/components/portfolio/assets/screens/jaydee-and-bea-opening.webp";
import joshuaAndBeaHero from "@/components/portfolio/assets/screens/joshua-and-bea-hero.webp";
import joshuaAndBeaOpening from "@/components/portfolio/assets/screens/joshua-and-bea-opening.webp";
import marianAndDeejayHero from "@/components/portfolio/assets/screens/marian-and-deejay-hero.webp";
import marianAndDeejayOpening from "@/components/portfolio/assets/screens/marian-and-deejay-opening.webp";
import marioAndInahHero from "@/components/portfolio/assets/screens/mario-and-inah-hero.webp";
import marioAndInahOpening from "@/components/portfolio/assets/screens/mario-and-inah-opening.webp";
import nylgenAndKerseeHero from "@/components/portfolio/assets/screens/nylgen-and-kersee-hero.webp";
import nylgenAndKerseeOpening from "@/components/portfolio/assets/screens/nylgen-and-kersee-opening.webp";
import ryanAndAnneHero from "@/components/portfolio/assets/screens/ryan-and-anne-hero.webp";
import ryanAndAnneOpening from "@/components/portfolio/assets/screens/ryan-and-anne-opening.webp";
import stephanieAt18Hero from "@/components/portfolio/assets/screens/stephanie-at-18-hero.webp";
import vincentAndGabrielleHero from "@/components/portfolio/assets/screens/vincent-and-gabrielle-hero.webp";
import vincentAndGabrielleOpening from "@/components/portfolio/assets/screens/vincent-and-gabrielle-opening.webp";

export type InvitationScreens = {
  opening: StaticImageData;
  hero: StaticImageData;
  hasOpening: boolean;
};

// Actual mobile screens captured from the invitation presentation components.
// Direct-entry designs reuse their initial hero rather than inventing a cover.
export const portfolioScreens: Record<string, InvitationScreens> = {
  "adi-and-jules": { opening: adiAndJulesOpening, hero: adiAndJulesHero, hasOpening: true },
  "aljay-and-erlyn": { opening: aljayAndErlynOpening, hero: aljayAndErlynHero, hasOpening: true },
  "ashley-at-18-rsvp": { opening: ashleyAt18RsvpHero, hero: ashleyAt18RsvpHero, hasOpening: false },
  "christina-and-reboden": { opening: christinaAndRebodenOpening, hero: christinaAndRebodenHero, hasOpening: true },
  "claudia-at-18": { opening: claudiaAt18Opening, hero: claudiaAt18Hero, hasOpening: true },
  "darell-and-roselle": { opening: darellAndRoselleOpening, hero: darellAndRoselleHero, hasOpening: true },
  "edcel-and-apreal": { opening: edcelAndAprealOpening, hero: edcelAndAprealHero, hasOpening: true },
  "eric-and-li": { opening: ericAndLiOpening, hero: ericAndLiHero, hasOpening: true },
  "isabella-and-daniel": { opening: isabellaAndDanielOpening, hero: isabellaAndDanielHero, hasOpening: true },
  "jaydee-and-bea": { opening: jaydeeAndBeaOpening, hero: jaydeeAndBeaHero, hasOpening: true },
  "joshua-and-bea": { opening: joshuaAndBeaOpening, hero: joshuaAndBeaHero, hasOpening: true },
  "marian-and-deejay": { opening: marianAndDeejayOpening, hero: marianAndDeejayHero, hasOpening: true },
  "mario-and-inah": { opening: marioAndInahOpening, hero: marioAndInahHero, hasOpening: true },
  "nylgen-and-kersee": { opening: nylgenAndKerseeOpening, hero: nylgenAndKerseeHero, hasOpening: true },
  "ryan-and-anne": { opening: ryanAndAnneOpening, hero: ryanAndAnneHero, hasOpening: true },
  "stephanie-at-18": { opening: stephanieAt18Hero, hero: stephanieAt18Hero, hasOpening: false },
  "vincent-and-gabrielle": { opening: vincentAndGabrielleOpening, hero: vincentAndGabrielleHero, hasOpening: true },
};
