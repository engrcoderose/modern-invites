"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { PrenupPoster } from "../photo-media";
import { Walking } from "../prenup-media";
import { prenupVideoStartedEvent, prenupVideoPassedEvent } from "../lib/events";
import SectionPetals from "./SectionPetals";

export const prenupPosterSrc = getImageProps({
  src: PrenupPoster,
  alt: "",
  width: 600,
  height: Math.round(600 * PrenupPoster.height / PrenupPoster.width),
  quality: 75,
}).props.src;

export default function PrenupVideo({ active = true }: { active?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handedOff = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!active) {
      video.pause();
      return;
    }
    // Start only once the envelope has opened. Muted playback works on mobile
    // without requiring another tap; native controls allow sound and pausing.
    void video.play().catch(() => {
      // Keep the native play button available if the browser blocks autoplay.
    });
  }, [active]);

  useEffect(() => {
    const video = videoRef.current;
    if (!active || !video) return;
    const observer = new IntersectionObserver(([entry]) => {
      // Hand over only when the film leaves above the fixed navigation,
      // never when it is still below the viewport or while the envelope opens.
      const passedVideo = !entry.isIntersecting && entry.boundingClientRect.bottom <= 80;
      if (!passedVideo || handedOff.current) return;
      handedOff.current = true;
      video.pause();
      window.dispatchEvent(new Event(prenupVideoPassedEvent));
    }, { rootMargin: "-80px 0px 0px 0px", threshold: 0 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [active]);

  return (
    <section id="invitation" aria-label="Our prenup film" className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[rgb(var(--aj-olive-deep))] px-3 pb-28 pt-24 sm:px-10 sm:pt-28">
      <Image src={Walking} alt="" aria-hidden="true" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgb(var(--aj-olive-shadow))]/65 via-[rgb(var(--aj-olive-shadow))]/55 to-[rgb(var(--aj-olive-shadow))]/80" />
      <SectionPetals variant="pink" />
      <div className="aj-prenup-frame relative w-full max-w-[min(72rem,calc((100svh-14rem)*16/9))] rounded border border-[#deccaa]/45 p-1 shadow-[0_24px_80px_#00000045] sm:rounded-xl sm:p-3">
        <video
          ref={videoRef}
          autoPlay={active}
          muted
          controls
          loop
          playsInline
          preload="none"
          poster={prenupPosterSrc}
          aria-label="Anjo and Jasmin prenup video"
          className="relative block aspect-video w-full rounded-sm border border-[#d6bc8e] bg-[rgb(var(--aj-olive-shadow))] object-contain"
          onPlay={() => {
            handedOff.current = false;
            window.dispatchEvent(new Event(prenupVideoStartedEvent));
          }}
        >
          <source src="/videos/anjo-and-jasmin/prenup.mp4" type="video/mp4" />
          Your browser does not support embedded video. <a href="/videos/anjo-and-jasmin/prenup.mp4">Watch the prenup video</a>.
        </video>
      </div>
      <a href="#top" aria-label="Continue to the wedding invitation" className="absolute bottom-7 left-1/2 flex min-h-11 -translate-x-1/2 flex-col items-center gap-3 text-[#f8eedb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6bc8e]">
        <span className="whitespace-nowrap text-[10px] uppercase tracking-[.3em]">Scroll down</span>
        <ArrowDown size={20} strokeWidth={1} aria-hidden="true" />
      </a>
    </section>
  );
}
