import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import styles from "../styles/invitation.module.css";
import { WoodlandBackdrop } from "./artwork";

export default function Section({ id, children, tone = "paper", background, className = "" }: { id: string; children: ReactNode; tone?: "paper" | "olive" | "woodland"; background?: StaticImageData; className?: string }) {
  return (
    <section id={id} tabIndex={-1} className={`${styles.section} ${styles[tone]} relative scroll-mt-20 px-6 py-20 text-center outline-none sm:px-10 sm:py-24 ${className}`}>
      {tone === "woodland" && <WoodlandBackdrop background={background} />}
      <div className="relative z-[1] mx-auto w-full max-w-[950px]">{children}</div>
    </section>
  );
}
