"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

export default function StickySlides({ children }: { children: ReactNode }) {
  const stack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slides = Array.from(stack.current?.children ?? []) as HTMLElement[];
    // Tall slides scroll fully into view before pinning their bottom edge.
    const measure = () => {
      for (const slide of slides) {
        slide.style.setProperty(
          "--slide-top",
          `${Math.min(0, window.innerHeight - slide.offsetHeight)}px`,
        );
      }
    };
    const observer = new ResizeObserver(measure);
    slides.forEach(slide => observer.observe(slide));
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={stack} className="relative isolate">
      {Children.map(children, (child, index) => (
        <div
          className="sticky top-[var(--slide-top,0px)] bg-[#fbf8f1] motion-reduce:static [&>section]:flex [&>section]:min-h-[100svh] [&>section]:flex-col [&>section]:justify-center [&>section]:scroll-mt-0"
          style={{ zIndex: index }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
