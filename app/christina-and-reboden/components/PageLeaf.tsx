"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { pageFold } from "../../../components/invitation-motion/page-fold";

// Match Leslie & Serj's corner fold, including its pace and easing.
const pageTurn = { duration: 1.25, ease: [0.38, 0.05, 0.25, 1] as const };
export type PageTransition = { from: string; to: string; direction: 1 | -1 };

export default function PageLeaf({ id, label, active, transition, className, onTurnComplete, children }: {
  id: string; label: string; active: boolean; transition: PageTransition | null;
  className: string; onTurnComplete: (id: string) => void; children: ReactNode;
}) {
  const page = useRef<HTMLElement>(null);
  const gradient = useId();
  const shadow = useId();
  const reduced = useReducedMotion();
  const [size, setSize] = useState({ width: 1, height: 1 });
  const outgoing = transition?.from === id;
  const visible = active || outgoing;
  const folding = Boolean(transition && (transition.direction > 0 ? outgoing : active));
  const progress = useMotionValue(0);
  const shape = useTransform(progress, value => pageFold(value, size.width, size.height));
  const front = useTransform(shape, value => value.front);
  const reverse = useTransform(shape, value => value.reverse);
  const opacity = useTransform(shape, value => value.opacity);
  const x1 = useTransform(shape, value => value.shadeStartX);
  const y1 = useTransform(shape, value => value.shadeStartY);
  const x2 = useTransform(shape, value => value.shadeEndX);
  const y2 = useTransform(shape, value => value.shadeEndY);

  useLayoutEffect(() => {
    if (!visible || !page.current) return;
    const element = page.current;
    const measure = () => setSize({ width: element.clientWidth, height: element.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  useLayoutEffect(() => {
    progress.set(folding && transition?.direction === -1 && !reduced ? 1 : 0);
  }, [folding, transition?.to, transition?.direction, reduced, progress]);

  useEffect(() => {
    if (!folding || !transition) return;
    const destination = transition.to;
    if (reduced) { onTurnComplete(destination); return; }
    const animation = animate(progress, transition.direction > 0 ? 1 : 0, {
      ...pageTurn, onComplete: () => onTurnComplete(destination),
    });
    return () => animation.stop();
  }, [folding, transition, reduced, progress, onTurnComplete]);

  return <section ref={page} hidden={!visible} inert={!active} aria-hidden={!active || undefined}
    role="group" aria-roledescription="slide" aria-label={label}
    className="absolute inset-0 h-full w-full overflow-hidden" style={{ zIndex: folding ? 2 : 1 }}>
    <motion.div className={`${className} absolute inset-0 overflow-hidden`} style={{ clipPath: front }}>{children}</motion.div>
    {folding && !reduced && <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-[4] h-full w-full" viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none">
      <defs>
        <filter id={shadow} x="-100%" y="-100%" width="300%" height="300%"><feDropShadow dx="3" dy="2" stdDeviation="5" floodColor="#514333" floodOpacity=".28" /></filter>
        <motion.linearGradient id={gradient} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
          <stop offset="0" stopColor="#fffaf1" stopOpacity="0" /><stop offset=".52" stopColor="#fffaf1" stopOpacity=".14" /><stop offset=".82" stopColor="#514333" stopOpacity=".08" /><stop offset="1" stopColor="#514333" stopOpacity=".22" />
        </motion.linearGradient>
      </defs>
      <motion.g style={{ opacity }}><motion.path d={reverse} fill="#f5eddf" filter={`url(#${shadow})`} /><motion.path d={reverse} fill={`url(#${gradient})`} /></motion.g>
    </svg>}
  </section>;
}
