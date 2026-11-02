import { ArrowDown } from "lucide-react";
import FloralOrnament from "../components/FloralOrnament";
import wedding from "../data/wedding-details.json";

export default function HeroSection() {
  const date = new Date(`${wedding.date.iso}T12:00:00+08:00`);
  const format = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { ...options, timeZone: wedding.date.timezone }).format(date);
  const [bride, groom] = wedding.couple.display.split(" & ");
  return (
    <section id="home" className="mj-hero relative isolate flex min-h-[calc(100svh-74px)] items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div className="mj-hero-frame absolute inset-4 sm:inset-8" aria-hidden="true" />
      <FloralOrnament className="mj-hero-flower absolute -bottom-5 -left-8 w-44 sm:w-60 lg:left-12 lg:w-72" />
      <FloralOrnament className="mj-hero-flower mj-flower-reverse absolute -right-8 -top-10 w-44 sm:w-60 lg:right-12 lg:w-72" />
      <div className="relative mx-auto w-full max-w-2xl">
        <p className="mb-8 text-sm sm:mb-12">Together with our families, we invite you to celebrate</p>
        <h1 tabIndex={-1} className="mj-script mj-hero-names text-[clamp(4rem,12vw,6rem)] leading-[1.2]">{bride} <span className="mj-ampersand my-1 block text-4xl">&</span> {groom}</h1>
        <p className="mj-small mb-8 mt-10">The beginning of our forever</p>
        <div className="mj-date mx-auto flex w-fit items-center gap-5 border-y px-4 py-5 sm:gap-8">
          <span className="mj-small">{format({ weekday: "long" })}</span>
          <span className="mj-display text-3xl">{format({ day: "numeric" })} <span className="text-xl italic">{format({ month: "long" })}</span> {format({ year: "numeric" })}</span>
          <span className="mj-small">{wedding.date.ceremonyTime}</span>
        </div>
        <p className="mt-6 text-sm">Baguio City, Philippines</p>
        <a href="#celebration" className="mj-text-link mt-12 inline-flex items-center gap-3 py-3 text-sm">A day to remember <ArrowDown size={15} aria-hidden="true" /></a>
      </div>
      <span className="mj-vertical-note absolute bottom-16 right-7 hidden text-xs lg:block" aria-hidden="true">{wedding.social.hashtag}</span>
    </section>
  );
}
