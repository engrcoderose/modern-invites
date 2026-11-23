import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import HeadingReveal from "@/components/marketing/HeadingReveal";
import Link from "./MotionLink";
import ScrollReveal from "./ScrollReveal";
import glasses from "./assets/hero/glasses.webp";
import styles from "./what-we-create.module.css";

const offerings = [
  {
    title: "Wedding invitations",
    description: "Set the tone with a personal invitation, event details, and a shareable link for your guests.",
    href: "/portfolio#wedding-invitations",
  },
  {
    title: "Websites for celebrations",
    description: "Bring birthdays, debuts, and other milestones together with photos, schedules, and meaningful details.",
    href: "/portfolio#other-invitations",
  },
  {
    title: "Smart RSVP",
    description: "Collect responses and party details, with guest limits and a client portal available by package.",
    href: "/#pricing-packages",
  },
  {
    title: "Guest seat finder",
    description: "Give guests a simple way to find their assigned table and seat. Explore the experience in our live sample.",
    href: "/portfolio#seat-finder",
  },
  {
    title: "Video invitations",
    description: "A personal invitation for your Ninong and Ninang, thoughtfully prepared to share digitally.",
    href: "/#digital-invitations",
  },
  {
    title: "Print-ready designs",
    description: "Custom invitation layouts supplied as high-resolution files for your chosen printer.",
    href: "/#services",
  },
] as const;

export default function WhatWeCreate() {
  return (
    <section id="what-we-create" aria-labelledby="create-heading" className={`${styles.section} scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20 lg:px-8`}>
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <ScrollReveal as="p" direction="fade" className="text-[11px] font-semibold uppercase tracking-[.2em] text-brand-800">
            What we create
          </ScrollReveal>
          <ScrollReveal direction="scale" className="my-4">
            <Image src={glasses} alt="" sizes="76px" className="mx-auto h-20 w-[76px] object-contain" />
          </ScrollReveal>
          <HeadingReveal
            id="create-heading"
            lines={["A thoughtful beginning for", <em key="celebration" className="text-brand-700">every celebration.</em>]}
            className="section-title text-marketing-ink"
          />
          <ScrollReveal as="p" delay={0.12} className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-marketing-muted sm:text-base sm:leading-8">
            Personalized invitation websites and designs for weddings, debuts,
            birthdays, and meaningful milestones, made to reflect your story.
          </ScrollReveal>
        </header>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {offerings.map((offering, index) => (
            <ScrollReveal as="li" key={offering.title} delay={(index % 3) * 0.06} className="min-w-0">
              <Link href={offering.href} className={`${styles.card} group flex h-full flex-col rounded-3xl p-6`}>
                <span aria-hidden="true" className="mb-4 flex items-center justify-between text-brand-800">
                  <span className="text-[10px] font-medium tracking-[.18em]">{String(index + 1).padStart(2, "0")}</span>
                  <ArrowUpRight className="link-arrow h-4 w-4" strokeWidth={1.5} />
                </span>
                <h3 className="font-elegant text-2xl leading-tight text-brand-900 group-hover:text-brand-800 sm:text-[1.65rem]">{offering.title}</h3>
                <p className="mt-3 text-sm leading-6 text-marketing-muted">{offering.description}</p>
              </Link>
            </ScrollReveal>
          ))}
        </ul>

        <p className="mt-7 text-center text-xs leading-6 text-marketing-muted">
          Each celebration is different. Features and inclusions vary by package.
        </p>
      </div>
    </section>
  );
}
