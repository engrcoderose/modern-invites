"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FloralArtwork from "./FloralArtwork";
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
    <FloralArtwork sizes="(min-width: 768px) 18vw, min(145px, 18svh)"
      className={`${styles.heroFlower} ${styles.heroBouquetLeft} absolute -bottom-5 -left-9 w-[min(145px,18svh)] md:-left-2 md:w-[18vw]`} />
    <FloralArtwork sizes="(min-width: 768px) 16vw, 135px"
      className={`${styles.heroFlower} ${styles.heroBouquetRight} absolute -right-8 -top-5 w-[135px] rotate-180 md:-right-2 md:w-[16vw]`} />
    <Image src={flowerTwo} alt="" sizes="(min-width: 768px) 23vw, 180px"
      className={`${styles.heroFlower} ${styles.heroBotanicalRight} absolute -bottom-16 -right-8 h-auto w-[180px] select-none opacity-45 md:-bottom-[6vw] md:-right-[3vw] md:w-[23vw]`} />
  </div>;
}
