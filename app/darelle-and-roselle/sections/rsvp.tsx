import Section from "../components/section";
import { Ornament } from "../components/artwork";
import RsvpSearch from "../components/rsvp-search";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const emailSubject = `Wedding RSVP - ${wedding.shortTitle}`;
const emailBody = "Full name:\n\nI will be attending / I will not be attending:\n\nMessage to the couple:\n";
const emailHref = `mailto:${wedding.contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

export default function Rsvp() {
  return (
    <Section id="rsvp" tone="woodland">
      <div className="mx-auto max-w-[700px]">
        <div className={`${styles.rsvpPlaque} relative mx-auto mb-7 w-[310px] max-w-[85%] px-7 py-5`}>
          <div className="pointer-events-none absolute -top-3 inset-x-0 flex justify-center" aria-hidden="true">
            <Ornament className={`${styles.plaqueOrnament} h-6 w-[76px] rounded-full px-2`} />
          </div>
          <h2 className={`${styles.script} whitespace-nowrap text-center text-[clamp(32px,5.2vw,44px)]`}>Kindly Reply</h2>
        </div>
        <div className={`${styles.rsvpCard} px-[22px] py-9 sm:px-[44px]`}>
          <p className={styles.rsvpIntro}>Find your invitation to let us know if you can join us.</p>
          <RsvpSearch />
        </div>
        <p id="dr-rsvp-availability" className="mx-auto mt-6 max-w-[520px] text-xs leading-[1.9]">
          Invitation lookup will be available soon. Please <a href={emailHref} className="underline underline-offset-4">RSVP by email</a> by {wedding.rsvpDeadline}.
        </p>
      </div>
    </Section>
  );
}
