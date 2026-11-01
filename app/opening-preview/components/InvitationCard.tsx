import Image from "next/image";
import { forwardRef } from "react";
import florals from "../assets/blue-botanical-frame.webp";
import styles from "../styles/opening.module.css";

const InvitationCard = forwardRef<HTMLHeadingElement, { opened: boolean }>(function InvitationCard({ opened }, ref) {
  return (
    <section aria-hidden={!opened} inert={!opened} className={`${styles.card} absolute inset-0 overflow-hidden`}>
      <Image src={florals} alt="" fill priority sizes="min(88vw, calc(57.97dvh - 74.21px), 420px)" className="object-fill" />
      <div className={`${styles.cardCopy} absolute flex flex-col items-center justify-center text-center`}>
        <span className={styles.cardScript}>With love</span>
        <h1 ref={ref} tabIndex={-1} className={`${styles.cardTitle} mt-[4cqw] outline-none`}>You&apos;re<br />invited</h1>
        <span aria-hidden="true" className={`${styles.rule} my-[5cqw] block w-[8cqw]`} />
        <p className={styles.cardMessage}>The beginning<br />of something beautiful.</p>
      </div>
    </section>
  );
});

export default InvitationCard;
