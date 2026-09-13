"use client";

import Image, { type StaticImageData } from "next/image";
import BlueFlower from "../../jasmin-and-anjo/assets/images/designs/blue-fower-water-color.png";
import Reveal from "../../jasmin-and-anjo/components/motion/Reveal";
import FloralAccent from "./FloralAccent";
import { prenupVideoStartedEvent } from "../../jasmin-and-anjo/lib/events";

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
      className="relative overflow-hidden bg-[#f1eee7] px-5 py-20 text-[#33473d] sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col items-center border border-[#d8d2c6] bg-[#fffdf8] px-5 py-12 text-center shadow-[0_18px_65px_-40px_#62445155] sm:px-10 sm:py-16 lg:px-16">
        <span aria-hidden="true" className="pointer-events-none absolute inset-2 border border-[#e7ddd0]" />
        <FloralAccent kind="pink" className="-left-6 -top-7 w-24 -rotate-12 sm:-left-8 sm:w-36" />
        <Reveal>
          <h2 id="invitation-title" className="max-w-4xl font-instrumentSerif text-[clamp(3rem,6vw,6.5rem)] leading-[1.02] tracking-[-0.045em]">
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
        <Reveal delay={0.2} className="relative isolate mt-10 w-full max-w-4xl border border-[#c3cdb8] bg-[#e8eddf] p-2 sm:mt-12 sm:p-3">
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

