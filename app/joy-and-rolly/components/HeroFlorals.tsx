"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FloralArtwork from "./FloralArtwork";
import flowerOne from "../designs/flower-1.png";
import flowerTwo from "../designs/flower-2.png";
import styles from "../styles/invitation.module.css";

export default function HeroFlorals() {
  const layer = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = layer.current;
    if (!element) return;
    let inView = false;
    const sync = () => setActive(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <div ref={layer} aria-hidden="true" data-floral-motion={active ? "active" : "paused"}
    className="pointer-events-none absolute inset-0 -z-10">
    <FloralArtwork sizes="(min-width: 768px) 24vw, 145px"
      className={`${styles.heroFlower} ${styles.heroBouquetLeft} absolute -bottom-5 -left-9 w-[145px] md:-left-2 md:w-[24vw]`} />
    <FloralArtwork sizes="(min-width: 768px) 21vw, 135px"
      className={`${styles.heroFlower} ${styles.heroBouquetRight} absolute -right-8 -top-5 w-[135px] rotate-180 md:-right-2 md:w-[21vw]`} />
    <Image src={flowerOne} alt="" sizes="(min-width: 768px) 24vw, 200px"
      className={`${styles.heroFlower} ${styles.heroBotanicalLeft} absolute -left-12 -top-24 h-auto w-[200px] select-none opacity-45 md:-left-[3vw] md:-top-[11vw] md:w-[24vw]`} />
    <Image src={flowerTwo} alt="" sizes="(min-width: 768px) 23vw, 180px"
      className={`${styles.heroFlower} ${styles.heroBotanicalRight} absolute -bottom-16 -right-8 h-auto w-[180px] select-none opacity-45 md:-bottom-[6vw] md:-right-[3vw] md:w-[23vw]`} />
  </div>;
}
