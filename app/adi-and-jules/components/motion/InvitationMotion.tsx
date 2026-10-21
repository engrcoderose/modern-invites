"use client";

import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";

const MotionContext = createContext({ active: true, parallax: false });

export const useInvitationMotion = () => useContext(MotionContext);

export default function InvitationMotion({ active, children }: PropsWithChildren<{ active: boolean }>) {
  const reducedMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <MotionContext.Provider value={{ active, parallax: active && desktop && !reducedMotion }}>
      {active && !reducedMotion && (
        <motion.div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[rgb(var(--aj-ivory))]/70" style={{ scaleX: scrollYProgress }} />
      )}
      {children}
    </MotionContext.Provider>
  );
}
