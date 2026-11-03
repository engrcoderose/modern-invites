import Image from "next/image";
import framedCouple from "../assets/design/olive-oval-aljay-erlyn-seaside.png";
import butterflies from "../assets/design/pastel-butterflies.png";
import WeddingCountdown from "../components/WeddingCountdown";
import { wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function CountdownPage({ enabled }: { enabled: boolean }) {
  return <div className={`${styles.countdownPage} flex w-full max-w-[620px] flex-col items-center gap-4 text-center sm:gap-5`}>
    <header className="flex flex-col items-center gap-2">
      <div className="relative" data-reveal>
        <Image src={framedCouple} alt="Aljay and Erlyn by the sea, framed in olive green with ivory flowers" sizes="(min-width: 768px) clamp(142px, 26.7svh, 222px), clamp(124px, 23.1svh, 196px)" className="h-[clamp(140px,26svh,220px)] w-auto max-w-full object-contain md:h-[clamp(160px,30svh,250px)]" />
        <Image src={butterflies} alt="" aria-hidden="true" sizes="(min-width: 768px) clamp(74px, 13.9svh, 116px), clamp(65px, 12svh, 102px)" className="pointer-events-none absolute -right-[36%] top-[8%] h-auto w-[52%] -rotate-12" />
      </div>
      <h2 className={styles.heading} data-reveal>Counting down to forever</h2>
    </header>
    <div className="flex flex-col items-center gap-2" data-reveal>
      <time dateTime={wedding.ceremonyISO} className={styles.date}>{wedding.date}</time>
      <p className={styles.small}>{wedding.venues[0].time}</p>
    </div>
    <WeddingCountdown enabled={enabled} />
  </div>;
}
