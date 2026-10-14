import Section from "../components/section";
import { Ornament } from "../components/artwork";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function Closing() {
  return (
    <Section id="closing">
      <div className="flex flex-col items-center gap-8">
        <Ornament className="h-7 w-[130px]" />
        <p className={`${styles.script} text-[42px]`}>{wedding.shortTitle}</p>
        <p className="text-xs">{wedding.date} · Marikina City</p>
        <a href="#invitation" className={`${styles.textLink} inline-flex min-h-11 items-center px-2 py-3`}>Back to invitation</a>
      </div>
    </Section>
  );
}
