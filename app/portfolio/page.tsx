"use client";

import { getImageProps } from "next/image";
import PageEntrance from "@/components/marketing/PageEntrance";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import MarketingAnalytics from "@/components/MarketingAnalytics";
import Footer from "@/components/Footer";
import SeatFinderSection from "@/components/portfolio/SeatFinderSection";

import { portfolioItems } from "@/lib/portfolio";
import InvitationCard from "@/components/portfolio/InvitationCard";
import { portfolioPhoneSizes } from "@/components/portfolio/image-sizes";
import MotionLink from "@/components/landing/MotionLink";
import ScrollReveal from "@/components/landing/ScrollReveal";


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

// Preload each additional first-row card only when its column is visible.
const desktopImagePreloads = invitationGroups[0].items.slice(1, 3).flatMap((item, index) =>
  [
    { src: item.screens.opening, sizes: portfolioPhoneSizes },
    { src: item.screens.hero, sizes: portfolioPhoneSizes },
  ].map(({ src, sizes }) => ({
    ...getImageProps({ src, sizes, alt: "", fill: true }).props,
    media: index === 0 ? "(min-width: 640px)" : "(min-width: 1024px)",
  }))
);

export default function PortfolioPage() {
  return (
    <div className="marketing-site min-h-screen bg-marketing-paper">
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

      <PageEntrance>
        <section className="bg-brand-100 px-5 pb-14 pt-32 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
            <div className="max-w-2xl">
              <ScrollReveal as="h1" delay={0.06} className="page-title text-marketing-ink">
                <span className="block">A little inspiration.</span>
              </ScrollReveal>
              <ScrollReveal as="p" delay={0.12} className="mx-auto mt-7 max-w-lg text-base leading-8 text-marketing-muted">
                Find a style that feels like you. Explore our invitation
                designs and try the full experience.
              </ScrollReveal>
              <p className="mt-6 text-sm text-brand-800">Our work</p>
            </div>
            <nav aria-label="Portfolio sections" className="flex shrink-0 flex-wrap justify-center gap-2">
              {invitationGroups.map((group) => (
                <MotionLink
                  key={group.id}
                  href={`#${group.id}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-4"
                >
                  {group.title}
                  <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-xs">{group.items.length}</span>
                </MotionLink>
              ))}
              <MotionLink
                href="#seat-finder"
                className="inline-flex min-h-11 items-center rounded-full border border-brand-200 bg-white px-5 text-sm font-semibold text-brand-700 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-4"
              >
                Seat Finder
              </MotionLink>
            </nav>
          </div>
        </section>

        <div id="invitations" className="scroll-mt-24">
          {invitationGroups.map((group, groupIndex) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              className={`scroll-mt-24 ${groupIndex === 0 ? "bg-marketing-paper" : "section-lilac"}`}
            >
              <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
                <ScrollReveal className="mb-10 flex flex-wrap items-end justify-between gap-5 pb-4">
                  <h2 id={`${group.id}-title`} className="font-elegant text-4xl text-marketing-ink sm:text-5xl">
                    {group.title}
                  </h2>
                  <p className="text-xs text-marketing-muted">Explore a live sample ↗</p>
                </ScrollReveal>

                <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item, index) => (
                    <ScrollReveal key={item.id} delay={(index % 3) * 0.06} className="h-full min-w-0">
                      <InvitationCard item={item} priority={groupIndex === 0 && index === 0} sizes={portfolioPhoneSizes} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <SeatFinderSection />

        <section className="bg-brand-100 px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <ScrollReveal direction="fade" className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-elegant text-4xl text-marketing-ink sm:text-5xl">Ready to create yours?</h2>
              <p className="mt-5 text-base leading-8 text-marketing-muted">Let’s make an invitation that feels like your celebration.</p>
            </div>
            <MotionLink
              href="/#inquire"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-5 self-start rounded-full bg-brand-700 px-7 py-3 text-sm font-medium text-white hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-4 focus-visible:ring-offset-brand-100"
            >
              Get started <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MotionLink>
          </ScrollReveal>
        </section>
      </PageEntrance>

      <Footer />
      <MarketingAnalytics />
    </div>
  );
}
