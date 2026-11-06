import { ArrowDown } from "lucide-react";
import Image from "next/image";
import HeroSlideshow from "../components/HeroSlideshow";
import OpeningHeroBackdrop from "../components/OpeningHeroBackdrop";
import topLeft from "../assets/designs/hero-flower-left.png";
import topRight from "../assets/designs/hero-flower-right.png";
import bottomLeft from "../assets/designs/hero-yellow-flowers-bl.png";
import bottomRight from "../assets/designs/hero-yellow-flowers-br.png";
import wedding from "../data/wedding-details.json";

export default function HeroSection({ openingPreview = false }: { openingPreview?: boolean }) {
  const date = new Date(`${wedding.date.iso}T12:00:00+08:00`);
  const format = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { ...options, timeZone: wedding.date.timezone }).format(date);
  const [bride, groom] = wedding.couple.display.split(" & ");
  return (
    <section id={openingPreview ? "mj-opening-home" : "home"} className="mj-hero relative isolate flex min-h-[max(720px,calc(100svh-74px))] items-center justify-center overflow-hidden px-6 pb-32 pt-28 text-center sm:min-h-[max(680px,calc(100svh-74px))] sm:px-12">
      {openingPreview ? <OpeningHeroBackdrop /> : <HeroSlideshow />}
      <div className="pointer-events-none absolute inset-2 z-10 border border-[#fff9c4]/60 sm:inset-3" aria-hidden="true" />
      <Image data-opening-part="top-flower-left" src={topLeft} alt="" sizes="(max-width: 639px) 112px, (max-width: 1023px) 176px, 224px" className="pointer-events-none absolute left-0 top-0 z-10 w-28 sm:w-44 lg:w-56" />
      <Image data-opening-part="top-flower-right" src={topRight} alt="" sizes="(max-width: 639px) 112px, (max-width: 1023px) 176px, 224px" className="pointer-events-none absolute right-0 top-0 z-10 w-28 sm:w-44 lg:w-56" />
      <Image data-opening-part="bottom-flower-left" src={bottomLeft} alt="" sizes="(max-width: 639px) 144px, (max-width: 1023px) 256px, 352px" className="pointer-events-none absolute bottom-0 left-0 z-10 w-36 sm:w-64 lg:w-[22rem]" />
      <Image data-opening-part="bottom-flower-right" src={bottomRight} alt="" sizes="(max-width: 639px) 144px, (max-width: 1023px) 256px, 352px" className="pointer-events-none absolute bottom-0 right-0 z-10 w-36 sm:w-64 lg:w-[22rem]" />
      <div className="mj-hero-copy pointer-events-none relative z-10 mx-auto w-full max-w-4xl">
        <p data-opening-part="intro" className="mx-auto mb-8 max-w-xs text-sm leading-7 sm:mb-10 sm:max-w-none"><span data-hero-kicker>Together with our families, we invite you to celebrate</span></p>
        <h1 data-opening-part="names" tabIndex={-1} className="mj-script mj-hero-names text-[clamp(3.8rem,8vw,6rem)] leading-[1.2]"><span data-hero-name="bride" className="inline-block">{bride}</span> <span className="mj-hero-and block text-4xl sm:inline sm:text-5xl"><span data-hero-name="and" className="inline-block">&</span></span> <span data-hero-name="groom" className="inline-block">{groom}</span></h1>
        <p data-opening-part="tagline" className="mj-small mb-7 mt-8"><span data-hero-detail>The beginning of our forever</span></p>
        <div data-opening-part="date" className="mj-date mx-auto flex w-fit items-center gap-5 border-y px-4 py-5 sm:gap-8">
          <span data-hero-detail className="mj-small">{format({ weekday: "long" })}</span>
          <span data-hero-detail className="mj-date-value text-3xl">{format({ day: "numeric" })} <span className="text-xl italic">{format({ month: "long" })}</span> {format({ year: "numeric" })}</span>
          <span data-hero-detail className="mj-small">{wedding.date.ceremonyTime}</span>
        </div>
        <p data-opening-part="location" className="mt-6 text-sm"><span data-hero-detail>Baguio City, Philippines</span></p>
        <a data-opening-part="action" href="#celebration" className="mj-text-link pointer-events-auto mt-8 inline-flex items-center gap-3 py-3 text-sm">A day to remember <ArrowDown size={15} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
