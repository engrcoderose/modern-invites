import Section from "../components/section";
import Countdown from "../components/countdown";
import SectionHeading from "../components/section-heading";
import { Ornament } from "../components/artwork";
import styles from "../styles/invitation.module.css";

export default function SaveTheDate() {
  return (
    <Section id="save-the-date">
      <div className="flex flex-col items-center gap-8">
        <SectionHeading title="Save the Date" />
        <p className={`${styles.script} max-w-[650px] text-[30px] sm:text-[36px]`}>We can&apos;t wait to celebrate with you!</p>
        <Countdown />
        <Ornament className="h-7 w-[130px]" />
      </div>
    </Section>
  );
}
