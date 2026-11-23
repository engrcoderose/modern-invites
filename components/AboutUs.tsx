import Image from "next/image";
import ScrollReveal from "@/components/landing/ScrollReveal";
import HeadingReveal from "@/components/marketing/HeadingReveal";
import seal from "@/components/landing/assets/hero/modern-invites-seal.webp";

export default function AboutUs() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 bg-brand-100 px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <HeadingReveal id="about-heading" lines={["Get to", <em key="know" className="text-brand-800">know us.</em>]} className="section-title text-marketing-ink" />
          <ScrollReveal direction="scale" className="mt-9"><Image src={seal} alt="Modern Invites" sizes="80px" className="h-20 w-20 object-contain" /></ScrollReveal>
        </div>
        <div className="studio-service-panel w-full max-w-2xl space-y-7 rounded-[2rem] p-7 text-base leading-8 text-marketing-ink sm:p-10 sm:text-lg sm:leading-9">
          <ScrollReveal as="p">Modern Invites brings a modern, heartfelt touch to invitation design. Every piece is thoughtfully crafted to reflect your story, your style, and the atmosphere you want to create.</ScrollReveal>
          <ScrollReveal as="p" delay={0.08}>We focus on clean, elegant aesthetics paired with meaningful details that make each invitation feel personal and intentional.</ScrollReveal>
          <ScrollReveal as="p" delay={0.16}>From announcing your event to welcoming your guests, Modern Invites delivers designs that are simple, stylish, and memorable—setting the perfect tone for your celebration.</ScrollReveal>
        </div>
      </div>
      <section aria-label="Our mission and vision" className="studio-closing mx-auto mt-12 grid max-w-7xl gap-12 rounded-[2rem] px-7 py-14 text-marketing-ink sm:mt-16 sm:px-12 sm:py-20 md:grid-cols-2 md:gap-20 lg:p-20">
        <ScrollReveal><h3 className="section-title italic text-brand-800">Mission</h3><p className="mt-7 max-w-lg text-base leading-8 text-marketing-muted">To deliver high-quality, modern invitation designs that capture each client&apos;s unique vision while providing a smooth, personalized, and professional experience from start to finish.</p></ScrollReveal>
        <ScrollReveal delay={0.08}><h3 className="section-title italic text-brand-800">Vision</h3><p className="mt-7 max-w-lg text-base leading-8 text-marketing-muted">To be a trusted and loved go-to designer for modern, memorable, and meaningful invitations that bring every special occasion to life.</p></ScrollReveal>
      </section>
    </section>
  );
}

