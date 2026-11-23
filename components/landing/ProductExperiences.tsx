import Link from "@/components/landing/MotionLink";
import { ArrowUpRight } from "lucide-react";
import websiteInvitations from "@/public/images/website-invitaions.png";
import readyToPrint from "@/public/images/ready-to-print.png";
import ScrollReveal from "./ScrollReveal";
import MediaReveal from "@/components/marketing/MediaReveal";
import styles from "./product-experiences.module.css";

const services = [
  {
    id: "website-service",
    image: websiteInvitations,
    alt: "Personalized invitation websites displayed on desktop and mobile screens",
    title: <>Your celebration,<br /><em>all in one link.</em></>,
    description: "Share your story, photos, and event details through a custom link, with RSVP options to suit your package.",
    href: "/portfolio",
    action: "View website invitations",
  },
  {
    id: "print-service",
    image: readyToPrint,
    alt: "Print-ready floral invitation stationery with coordinating event details",
    title: <>Prefer something<br /><em>to hold?</em></>,
    description: "Custom invitation designs, supplied as high-resolution files for your printer.",
    href: "/#inquire",
    action: "Ask about print designs",
  },
];

const artworkSizes = "(min-width: 1056px) 448px, (min-width: 1024px) calc(50vw - 80px), (min-width: 768px) calc(50vw - 72px), (min-width: 488px) 448px, calc(100vw - 40px)";

export default function ProductExperiences() {
  return (
    <section id="services" aria-label="Invitation services" className="bg-brand-100 scroll-mt-24 px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:gap-0">
        {services.map((service, index) => (
          <article key={service.id} aria-labelledby={`${service.id}-heading`} className={`flex min-w-0 flex-col ${index === 0 ? "md:pr-12" : "border-t border-brand-700/15 pt-12 md:border-l md:border-t-0 md:pl-12 md:pt-0"}`}>
            <div className={`${styles.artwork} relative mx-auto w-full max-w-md`}>
              <MediaReveal src={service.image} alt={service.alt} sizes={artworkSizes} className="relative z-10" />
            </div>
            <ScrollReveal delay={index * 0.08} className="mt-5 flex flex-1 flex-col">
              <h2 id={`${service.id}-heading`} className={`${styles.title} text-marketing-ink`}>{service.title}</h2>
              <p className="mb-6 mt-5 max-w-md text-base leading-7 text-marketing-muted">{service.description}</p>
              <Link href={service.href} className="group mt-auto inline-flex min-h-12 items-center justify-between gap-6 self-start border-b border-brand-700/25 py-3 text-sm font-semibold text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-4">
                {service.action}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-200/70"><ArrowUpRight className="link-arrow h-4 w-4 shrink-0" aria-hidden="true" /></span>
              </Link>
            </ScrollReveal>
          </article>
        ))}
      </div>
    </section>
  );
}
