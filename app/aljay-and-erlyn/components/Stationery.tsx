import { Flower2 } from "lucide-react";
import type { ReactNode } from "react";
import styles from "../styles/wedding.module.css";

export function Ornament() {
  return <div aria-hidden="true" className={`${styles.ornament} mx-auto flex items-center justify-center gap-4`}><span /><Flower2 size={23} strokeWidth={1} /><span /></div>;
}

export function Monogram({ className = "" }: { className?: string }) {
  return <span className={`${styles.monogram} ${className}`} aria-label="Aljay and Erlyn">A<span className={styles.monogramAmp}>&</span>E</span>;
}

export function PageHeading({ children }: { children: ReactNode }) {
  return <h2 className={`${styles.heading} mb-7 text-center md:mb-10 [@media(max-height:800px)]:mb-6`} data-reveal>{children}</h2>;
}

export function Names({ cover = false }: { cover?: boolean }) {
  return <span className={`${styles.coupleNames} flex items-center justify-center ${cover ? "flex-wrap gap-x-3 gap-y-0" : "gap-[0.2em]"}`}><span>Aljay</span><span className={styles.namesAmp}>&</span><span>Erlyn</span></span>;
}
