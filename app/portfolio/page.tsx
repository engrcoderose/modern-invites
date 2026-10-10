"use client";

import { getImageProps } from "next/image";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import MarketingAnalytics from "@/components/MarketingAnalytics";
import Footer from "@/components/Footer";
import SeatFinderSection from "@/components/portfolio/SeatFinderSection";
import { CONTACT_URL } from "@/lib/site";

import { portfolioItems } from "@/lib/portfolio";
import InvitationCard from "@/components/portfolio/InvitationCard";

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

const backgroundImageSizes = "(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 36px), (max-width: 1151px) calc(33.333vw - 37.333px), 347px";
const previewImageSizes = "160px";
// Preload each additional first-row card only when its column is visible.
const desktopImagePreloads = invitationGroups[0].items.slice(1, 3).flatMap((item, index) =>
  [
    { src: item.bgImage, sizes: backgroundImageSizes },
    { src: item.previewImage, sizes: previewImageSizes },
  ].map(({ src, sizes }) => ({
    ...getImageProps({ src, sizes, alt: "", fill: true }).props,
    media: index === 0 ? "(min-width: 640px)" : "(min-width: 1024px)",
  }))
);

export default function PortfolioPage() {
  return (
    <div className="marketing-site min-h-screen bg-white">
      {desktopImagePreloads.map((image) => (
        <link
          key={image.src}
          rel="preload"
          as="image"
          href={image.srcSet ? undefined : image.src}
          imageSrcSet={image.srcSet}
          imageSizes={image.sizes}
          media={image.media}
        />
      ))}
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

              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {group.items.map((item, index) => (
                  <InvitationCard key={item.id} item={item} priority={groupIndex === 0 && index === 0} sizes={backgroundImageSizes} />
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
