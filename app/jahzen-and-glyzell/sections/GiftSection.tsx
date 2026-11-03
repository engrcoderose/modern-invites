import Reveal from "../components/Reveal";
import Image from "next/image";
import giftBow from "../assets/artwork/gift-bow.webp";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function GiftSection() {
  return <section id="gifts" tabIndex={-1} aria-labelledby="jg-gift-title" className={`${styles.paper} scroll-mt-24 px-6 py-24 text-center sm:px-10 lg:py-40`}>
    <Reveal className="mx-auto max-w-4xl">
      <div aria-hidden="true" className="mx-auto mb-6 w-24 sm:w-28">
        <Image src={giftBow} alt="" sizes="(max-width: 639px) 96px, 112px" className="h-auto w-full" />
      </div>
      <h2 id="jg-gift-title" className={styles.heading}>Your presence is<br /><em>our greatest gift.</em></h2>
      <p className={`${styles.prose} mx-auto mt-8 max-w-2xl`}>{wedding.giftNote}</p>
    </Reveal>
  </section>;
}
