import Image from "next/image";
import { ArrowDown } from "lucide-react";
import lace from "../assets/lace-medallion.webp";
import satin from "../assets/pink-satin.webp";
import { celebration } from "../data/event";
import styles from "../styles/invitation.module.css";
import DecorativeArtwork from "../components/DecorativeArtwork";

export default function HeroSection() {
  return (
    <section id="home" aria-labelledby="ashley-title" className="scroll-mt-[72px]">
      <div className="relative isolate flex min-h-[calc(100svh-72px)] items-center justify-center overflow-hidden bg-[#b66c8a] px-3 py-12 sm:py-16">
        <Image src={satin} alt="" aria-hidden="true" fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="relative aspect-[2/3] w-[min(90vw,440px)] shrink-0">
          <Image src={lace} data-reveal="artwork" alt="" aria-hidden="true" fill priority unoptimized className="object-contain" />
          <div className="absolute inset-x-[22%] bottom-[24%] top-[25%] flex flex-col items-center justify-center text-center text-[#784156]">
            <h1 id="ashley-title" data-reveal="heading" data-reveal-delay="120" className={styles.title}><span>Ashley</span><span className={styles.age}>at 18</span></h1>
            <p data-reveal="message" data-reveal-delay="240" className="mt-6 text-[10px] uppercase leading-5 tracking-[0.18em] sm:text-xs">A new chapter<br />begins</p>
            <time data-reveal="message" data-reveal-delay="360" dateTime={celebration.dateTime} className="mt-7 text-xs leading-6 tracking-[0.08em]">DECEMBER 5<br />2026</time>
          </div>
        </div>
      </div>
      <div className="relative isolate overflow-hidden bg-white px-6 py-16 text-center sm:py-20">
        <DecorativeArtwork name="pinkBow" sizes="(min-width: 640px) 80px, 64px" className="mx-auto mb-8 w-16 sm:w-20" />
        <p data-reveal="message" data-reveal-delay="120" className="mx-auto max-w-xl text-sm leading-8 text-[#674b61]">{celebration.story}</p>
        <p data-reveal="message" data-reveal-delay="240" className="mx-auto mt-6 max-w-lg font-instrumentSerif text-2xl leading-9 text-[#784156] sm:text-3xl sm:leading-10">{celebration.invitation}</p>
        <a href="#rsvp" data-reveal="button" data-reveal-delay="360" className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#9b3561] px-7 py-3 text-sm text-[#9b3561] transition-colors hover:bg-[#fce0eb]">Kindly RSVP <ArrowDown aria-hidden="true" className="size-4" /></a>
        <DecorativeArtwork name="pinkLilies" sizes="(min-width: 1024px) 176px, 112px" className="mx-auto mt-8 w-28 lg:absolute lg:bottom-8 lg:left-8 lg:mt-0 lg:w-44" />
      </div>
    </section>
  );
}
