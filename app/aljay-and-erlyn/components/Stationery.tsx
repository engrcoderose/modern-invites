import Image from "next/image";
import type { ReactNode } from "react";
import weddingLogo from "../assets/design/wedding-log.png";
import greenWeddingLogo from "../assets/design/wedding-logo-green.png";
import titleFrame from "../assets/design/story-title-frame.png";
import styles from "../styles/wedding.module.css";

export function Ornament() {
  return <svg className={`${styles.ornament} mx-auto h-[27px] w-[130px]`} viewBox="0 0 170 34" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth=".9"><path d="M0 17h52c19 0 15-16 5-12-9 4 7 20 28 12 21 8 37-8 28-12-10-4-14 12 5 12h52M63 23c13 7 17-2 22-6 5 4 9 13 22 6" /><path d="m85 7 4 10-4 10-4-10Z" /><circle cx="40" cy="17" r="2" /><circle cx="130" cy="17" r="2" /></g></svg>;
}

export function WeddingLogo({ className = "", priority = false, sizes = "clamp(137px, 26.6svh, 230px)", variant = "ivory" }: { className?: string; priority?: boolean; sizes?: string; variant?: "ivory" | "green" }) {
  return <span className={`relative block aspect-[33/46] ${className}`}><Image src={variant === "green" ? greenWeddingLogo : weddingLogo} alt="Aljay and Erlyn wedding logo" fill priority={priority} sizes={sizes} className="object-contain" draggable={false} /></span>;
}

export function Monogram({ className = "" }: { className?: string }) {
  return <span className={`${styles.monogram} ${className}`} aria-label="Aljay and Erlyn">A<span className={styles.monogramAmp}>&</span>E</span>;
}

export function PageHeading({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return <h2 className={`${styles.heading} ${compact ? "mb-6" : "mb-7 md:mb-10 [@media(max-height:800px)]:mb-6"} text-center`} data-reveal>{children}</h2>;
}

export function FramedHeading({ children, headingClassName, sizes, label }: {
  children: ReactNode; headingClassName: string; sizes: string; label?: string;
}) {
  return <div className="relative w-full">
    <Image src={titleFrame} alt="" sizes={sizes} className="h-auto w-full" />
    <h2 aria-label={label} className={`${headingClassName} absolute bottom-[31%] left-[17%] right-[20%] top-[23%] flex flex-col items-center justify-center`}>
      {children}
    </h2>
  </div>;
}
