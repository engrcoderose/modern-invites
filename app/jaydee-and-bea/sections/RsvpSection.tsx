import Image from "next/image";
import { wedding } from "../data/wedding-data";
import { rsvpPhoto } from "../data/photo-layout";
import RsvpFlow from "../components/RsvpFlow";
import ScrollLayer from "../components/ScrollLayer";
import TextReveal from "../components/TextReveal";
import floralBackground from "../assets/designs/gallery-floral-background.webp";
import leftFlowers from "../assets/designs/hero-left-upper-flower.webp";
import rightFlowers from "../assets/designs/hero-right-upper-flower.webp";
import styles from "../styles/rsvp.module.css";

export default function RsvpSection() {
  return (
    <section id="rsvp" aria-label="RSVP" className={`${styles.section} relative isolate overflow-hidden px-5 py-16 text-center sm:px-8 md:py-20 lg:px-12`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none opacity-60">
        <Image src={floralBackground} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 -z-10 w-24 -scale-y-100 select-none opacity-40 sm:w-40">
        <Image src={leftFlowers} alt="" sizes="(min-width: 640px) 160px, 96px" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 -z-10 w-24 -scale-y-100 select-none opacity-40 sm:w-40">
        <Image src={rightFlowers} alt="" sizes="(min-width: 640px) 160px, 96px" />
      </div>
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <ScrollLayer as="figure" profile="photo" staggerIndex={1} className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden">
          <Image src={rsvpPhoto.src} alt={rsvpPhoto.alt} fill sizes="(min-width: 1380px) 517px, (min-width: 1024px) calc((100vw - 160px) * .425), (min-width: 736px) 672px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)" className="object-cover" loading="lazy" />
        </ScrollLayer>
        <div className="mx-auto w-full min-w-0 max-w-2xl">
          <RsvpFlow eventSlug={wedding.rsvp.eventSlug} pendingMessage={wedding.rsvp.pendingMessage} />
          {wedding.rsvp.deadline && <TextReveal staggerIndex={3} className={`${styles.status} mt-8 text-sm leading-7`}>Please reply by {wedding.rsvp.deadline}.</TextReveal>}
        </div>
      </div>
    </section>
  );
}

