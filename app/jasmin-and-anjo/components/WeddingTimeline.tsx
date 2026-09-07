"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, Church, Music2, Wine } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { TimelineEvent } from "../types";
import Flowers from "../assets/images/designs/pink-flower-with-leaf.png";
import Reveal from "./motion/Reveal";

function Illustration({ index }: { index: number }) {
  if (index === 1) return <Image src={Flowers} alt="" width={110} height={110} className="timeline-bouquet" />;
  const Icon = [Church, Church, Camera, Wine, Music2][index % 5];
  return <div className={`timeline-illustration timeline-illustration-${index % 5}`}>
    <span className="timeline-watercolor" />
    <Icon size={68} strokeWidth={1} />
    <svg className="timeline-leaves" viewBox="0 0 90 40" fill="none" aria-hidden="true"><path d="M8 34C27 36 45 26 63 7M24 32C12 28 12 20 14 16C22 18 26 23 24 32ZM36 26C35 15 40 10 45 9C47 17 44 23 36 26ZM48 19C57 22 67 18 70 14C61 11 54 12 48 19Z" stroke="#889779" strokeWidth="1" fill="#b9c7aa" fillOpacity=".65" /></svg>
  </div>;
}

export default function WeddingTimeline({ program }: { program: TimelineEvent[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const markerTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  if (!program.length) return null;
  return <section id="timeline" className="wedding-timeline" aria-labelledby="wedding-timeline-title">
    <div className="timeline-paper">
      <header className="timeline-heading">
        <p>A day to remember</p>
        <h2 id="wedding-timeline-title">Wedding <em>timeline</em></h2>
        <span>November 21, 2026</span>
        <small>Sample program · Times to be confirmed</small>
      </header>
      <ol ref={listRef} className="timeline-events">
        <li className="timeline-rail" aria-hidden="true">
          {!reducedMotion && <motion.span className="timeline-traveler" style={{ top: markerTop }} />}
        </li>
        {program.map((event, index) => <li className="timeline-event" key={`${event.time}-${event.title}`}>
          <Reveal y={14} className="timeline-art"><Illustration index={index} /></Reveal>
          <Reveal y={14} delay={0.06} className="timeline-event-copy">
            <time>{event.time}</time>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </Reveal>
        </li>)}
      </ol>
      <p className="timeline-signoff">A little love in every moment.</p>
    </div>
  </section>;
}
