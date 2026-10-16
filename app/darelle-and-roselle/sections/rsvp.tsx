import Section from "../components/section";
import { Ornament } from "../components/artwork";
import RsvpForm from "../components/rsvp-form";
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
          <RsvpForm />
          <noscript><p className="mt-4 text-sm leading-7">Please enable JavaScript to use the RSVP form, or reply by email below.</p></noscript>
        </div>
        <p id="dr-rsvp-availability" className="mx-auto mt-6 max-w-[520px] text-xs leading-[1.9]">
          Please reply by {wedding.rsvpDeadline}. Need help? You can also <a href={emailHref} className="underline underline-offset-4">RSVP by email</a>.
        </p>
      </div>
    </Section>
  );
}
