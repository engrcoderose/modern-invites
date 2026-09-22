"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import MarketingAnalytics from "@/components/MarketingAnalytics";
import Footer from "@/components/Footer";
import SeatFinderSection from "@/components/portfolio/SeatFinderSection";
import { CONTACT_URL } from "@/lib/site";

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

const portfolioItems = [
  {
    id: "joshua-and-bea",
    title: "Joshua & Bea",
    category: "Wedding Invitation",
    description:
      "A pastel garden wedding with a heartfelt love story, photo collections, maps, music, and elegant animations.",
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
      "Botanical details, a cinematic welcome, and a personal RSVP in soft ivory and sage.",
    href: "/nylgen-and-kersee",
    bgImage: nylgenKerseeBackground,
    previewImage: nylgenKerseeCouple,
    accent: "#455f4b",
    accentLight: "#f3f5ed",
    tags: ["Botanical", "Ivory & Sage"],
  },
  {
    id: "isabella-and-daniel",
    title: "Isabella & Daniel",
    category: "Wedding Invitation",
    description:
      "Rich burgundy, champagne gold, and cinematic storytelling with music and guest RSVP.",
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
      "A vibrant debut with dress guides, an 18 roses and candles program, and a personal RSVP.",
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
      "Luxury romance with a love-story timeline, live countdown, attire guide, seat finder, and RSVP.",
    href: "/eric-and-li",
    bgImage: ericHeroBg,
    previewImage: ericCoupleImg,
    accent: "#4e2a0d",
    accentLight: "#f7efe4",
    tags: ["Luxury", "Coffee & Brown"],
  },
];

const invitationGroups = [
  {
    id: "wedding-invitations",
    title: "Wedding Invitations",
    items: portfolioItems.filter((item) => item.category === "Wedding Invitation"),
  },
  {
    id: "other-invitations",
    title: "Other Invitations",
    items: portfolioItems.filter((item) => item.category !== "Wedding Invitation"),
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        <section className="bg-gradient-to-b from-sage-50 to-white px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 xl:flex-row xl:items-end">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">
                Our work
              </p>
              <h1 className="font-elegant text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                A little inspiration.
              </h1>
              <p className="mt-4 max-w-lg text-base leading-7 text-gray-600">
                Find a style that feels like you. Explore our invitation
                designs and try the full experience.
              </p>
            </div>
            <nav aria-label="Portfolio sections" className="flex shrink-0 flex-wrap gap-2">
              {invitationGroups.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-sage-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-sage-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-4"
                >
                  {group.title}
                  <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-xs">{group.items.length}</span>
                </a>
              ))}
              <a
                href="#seat-finder"
                className="inline-flex min-h-11 items-center rounded-full border border-sage-200 bg-white px-5 text-sm font-semibold text-sage-700 transition-colors hover:bg-sage-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-4"
              >
                Seat Finder
              </a>
            </nav>
          </div>
        </section>

        <div id="invitations" className="scroll-mt-24">
          {invitationGroups.map((group, groupIndex) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-12 sm:px-6 lg:px-8"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-t border-sage-100 pt-6">
                <h2 id={`${group.id}-title`} className="font-elegant text-2xl font-bold text-gray-900 sm:text-3xl">
                  {group.title}
                </h2>
                <p className="text-xs text-gray-500">Explore a live sample ↗</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                {group.items.map((item, index) => (
                  <article key={item.id} className="min-w-0">
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${item.title} invitation (opens in a new tab)`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-4"
                    >
                      <div
                        className="relative h-48 overflow-hidden sm:h-52 lg:h-56"
                        style={{ backgroundColor: item.accentLight }}
                      >
                        <Image
                          src={item.bgImage}
                          alt=""
                          fill
                          priority={groupIndex === 0 && index < 2}
                          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                          sizes="(max-width: 639px) 100vw, (max-width: 1152px) 50vw, 550px"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center py-4">
                          <div className="relative aspect-[3/4] h-full rotate-[-4deg] overflow-hidden rounded-lg border-4 border-white/90 shadow-xl transition-transform duration-500 motion-safe:group-hover:rotate-0">
                            <Image
                              src={item.previewImage}
                              alt={`${item.title} invitation preview`}
                              fill
                              priority={groupIndex === 0 && index < 2}
                              className="object-cover object-top"
                              sizes="160px"
                            />
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-gray-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-800 transition-colors group-hover:bg-white">
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: item.accent }}>
                          {item.category}
                        </p>
                        <h3 className="mt-1.5 font-elegant text-2xl font-bold leading-tight text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {item.description}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold" style={{ color: item.accent }}>
                          View invitation
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <SeatFinderSection />

        <section className="bg-sage-700 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-elegant text-3xl font-bold text-white">Ready to create yours?</h2>
              <p className="mt-2 text-sm leading-6 text-sage-100">Let’s make an invitation that feels like your celebration.</p>
            </div>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-semibold text-sage-700 transition-colors hover:bg-sage-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-sage-700"
            >
              Get started <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <MarketingAnalytics />
    </div>
  );
}
