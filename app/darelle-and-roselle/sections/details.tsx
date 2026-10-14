import Image from "next/image";
import Section from "../components/section";
import SectionHeading from "../components/section-heading";
import { Ornament } from "../components/artwork";
import { wedding } from "../data/wedding";
import { media } from "../data/media";
import styles from "../styles/invitation.module.css";

export function Schedule() {
  return (
    <Section id="schedule">
      <SectionHeading title="The Wedding Day" className="mb-8" />
      <ol className="mx-auto grid max-w-[540px] gap-0 text-left">
        {wedding.timeline.map((event) => <li key={event.time} className={`${styles.timelineItem} grid grid-cols-[90px_1fr] items-baseline gap-5 py-5 sm:grid-cols-[120px_1fr] sm:gap-8`}><span className="text-xs tabular-nums sm:text-sm">{event.time}</span><span className={`${styles.script} text-[30px] sm:text-[36px]`}>{event.title}</span></li>)}
      </ol>
    </Section>
  );
}

export function Attire() {
  return (
    <Section id="attire" tone="olive">
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6">
        <SectionHeading title="The Dress Code" />
        <p className={styles.body}>We kindly request <strong>{wedding.attire.formality}</strong> attire for our guests.</p>
        <p className={styles.body}>{wedding.attire.restrictions.split(/(\brefrain\b)/).map((part, index) => part === "refrain" ? <strong key={index} className="font-bold underline underline-offset-2">{part}</strong> : part)}</p>
        <figure data-dr-reveal className="w-[85%] max-w-[480px] sm:w-full">
          <Image src={media.attireGuide} alt="Ivory outline drawing of an elegant dress and tailored suit for semi-formal outfit inspiration." sizes="(min-width: 640px) 480px, calc(85vw - 40.8px)" className="h-auto w-full" />
        </figure>
        <Ornament className="h-7 w-[130px]" />
      </div>
    </Section>
  );
}

