import Image from "next/image";
import Link from "./MotionLink";
import ScrollReveal from "./ScrollReveal";
import HeroInvitationPreviews from "./HeroInvitationPreviews";
import HeroHighlights from "./HeroHighlights";
import seal from "./assets/hero/modern-invites-seal.webp";
import butterfly from "./assets/hero/butterfly.webp";
import bouquet from "./assets/hero/bouquet.webp";
import locket from "./assets/hero/locket.webp";
import glasses from "./assets/hero/glasses.webp";
import styles from "./hero.module.css";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className={`${styles.hero} marketing-atmosphere relative isolate overflow-hidden px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-24`}
    >
      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <Image
          src={seal}
          alt="Modern Invites"
          width={76}
          height={76}
          priority
          sizes="(min-width: 640px) 76px, 64px"
          className="h-16 w-16 object-contain sm:h-[76px] sm:w-[76px]"
        />
        <ScrollReveal className="relative z-10 mt-3 w-full sm:mt-4">
          <h1 id="hero-heading" className={`${styles.heading} mx-auto max-w-5xl`}>
            Sharing the <span className={styles.emphasis}>romance</span> of your special
            <br className="hidden sm:block" />{" "}
            day through a <em className={styles.emphasis}>beautifully crafted</em>
            <br className="hidden sm:block" />{" "}
            <em className={styles.emphasis}>invitation.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-6 sm:mt-7 sm:text-base sm:leading-7">
            We create a custom invitation website that reflects your style and your occasion and not just a template.
            Review it, approve it, and share it with the people you love.
          </p>
        </ScrollReveal>

        <div className="relative mt-8 w-full">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
            <Image src={butterfly} alt="" sizes="(min-width: 1024px) 150px, (min-width: 640px) 110px, 68px" className={`${styles.butterfly} absolute h-auto w-[68px] sm:w-[110px] lg:w-[150px]`} />
            <Image src={bouquet} alt="" sizes="(min-width: 1024px) 160px, (min-width: 640px) 120px, 76px" className={`${styles.bouquet} absolute h-auto w-[76px] sm:w-[120px] lg:w-[160px]`} />
            <Image src={locket} alt="" sizes="(min-width: 1024px) 140px, (min-width: 640px) 100px, 65px" className={`${styles.locket} absolute h-auto w-[65px] sm:w-[100px] lg:w-[140px]`} />
            <Image src={glasses} alt="" sizes="(min-width: 1024px) 160px, (min-width: 640px) 120px, 76px" className={`${styles.glasses} absolute h-auto w-[76px] sm:w-[120px] lg:w-[160px]`} />
          </div>
          <ScrollReveal delay={0.12} className="relative z-10">
            <HeroInvitationPreviews />
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
            <Link href="/#pricing-packages" className={`${styles.primaryAction} inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold sm:px-7`}>
              View Packages
            </Link>
            <Link href="/portfolio" className={`${styles.secondaryAction} inline-flex min-h-11 items-center justify-center rounded-full border px-6 py-3 text-sm font-medium sm:px-7`}>
              Sample Designs
            </Link>
          </ScrollReveal>
        </div>
        <HeroHighlights />
      </div>
    </section>
  );
}
