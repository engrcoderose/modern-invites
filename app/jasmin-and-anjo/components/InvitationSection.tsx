"use client";

import Image, { type StaticImageData } from "next/image";
import BlueFlower from "../assets/images/designs/blue-fower-water-color.png";
import Reveal from "./motion/Reveal";
import Botanicals from "./Botanicals";
import { prenupVideoStartedEvent } from "../lib/events";

interface InvitationSectionProps {
  message: string;
  videoSrc: string;
  poster: StaticImageData;
}

export default function InvitationSection({ message, videoSrc, poster }: InvitationSectionProps) {
  return (
    <section
      id="invitation"
      aria-labelledby="invitation-title"
      className="relative overflow-hidden bg-[#fbf8f1] bg-[radial-gradient(ellipse_at_95%_5%,#f3e3e6aa,transparent_55%)] px-5 py-24 text-[#33473d] sm:px-8 sm:py-32 lg:px-12"
    >
      <Botanicals className="-right-20 top-[35px] w-[290px] rotate-[175deg] opacity-[.35]" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <Reveal>
          <h2 id="invitation-title" className="max-w-5xl font-instrumentSerif text-[clamp(3.4rem,7vw,7.2rem)] leading-[0.95] tracking-[-0.045em]">
            the beginning of <span className="text-[#637b65]">our forever.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 font-libreBaskerville text-sm leading-8 text-[#616b60] sm:text-base sm:leading-9">
            Some things are simply<br />meant to bloom.
          </p>
          <p className="mx-auto max-w-4xl font-libreBaskerville text-sm leading-8 text-[#616b60] sm:text-base sm:leading-9">
            {message}
          </p>
        </Reveal>
        <Reveal delay={0.2} className="relative isolate mt-10 w-full max-w-4xl sm:mt-12">
          <Image
            src={BlueFlower}
            alt=""
            aria-hidden="true"
            sizes="(max-width: 640px) 112px, 192px"
            className="pointer-events-none absolute -bottom-16 -left-8 z-0 h-auto w-28 select-none sm:-bottom-20 sm:-left-24 sm:w-48"
          />
          <video
            controls
            loop
            playsInline
            preload="metadata"
            poster={poster.src}
            aria-label="Anjo and Jasmin prenup video"
            className="relative z-10 aspect-video w-full bg-[#263d35] object-contain shadow-[0_18px_60px_rgba(38,61,53,.12)]"
            onPlay={() => window.dispatchEvent(new Event(prenupVideoStartedEvent))}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support embedded video. <a href={videoSrc}>Watch the prenup video</a>.
          </video>
        </Reveal>
      </div>
    </section>
  );
}
