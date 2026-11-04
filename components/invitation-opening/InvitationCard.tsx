import Image from "next/image";
import type { ReactNode } from "react";
import florals from "./assets/blue-botanical-frame.webp";
import styles from "./styles/opening.module.css";

interface InvitationCardProps {
  opened: boolean;
  children: ReactNode;
}

export default function InvitationCard({ opened, children }: InvitationCardProps) {
  return (
    <section aria-hidden={!opened} inert={!opened} className={`${styles.card} absolute inset-0 overflow-hidden`}>
      <Image src={florals} alt="" fill priority sizes="min(88vw, calc(57.97dvh - 74.21px), 420px)" className="object-fill" />
      <div className={`${styles.cardCopy} absolute flex flex-col items-center justify-center text-center`}>
        {children}
      </div>
    </section>
  );
}
