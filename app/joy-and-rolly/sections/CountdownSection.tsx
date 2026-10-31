import Image from "next/image";
import Countdown from "../components/Countdown";
import InvitationReveal from "../components/InvitationReveal";
import backdrop from "../assets/countdown-satin-lilies.webp";
import styles from "../styles/invitation.module.css";

export default function CountdownSection() {
  return <section id="countdown" aria-labelledby="jr-countdown-heading" className={`${styles.countdownSection} relative isolate flex min-h-[clamp(360px,56vw,760px)] scroll-mt-16 items-center justify-center overflow-hidden px-4 py-20 text-center sm:px-10`}>
    <Image src={backdrop} alt="" fill sizes="100vw" className="pointer-events-none -z-10 select-none object-cover" />
    <div className="mx-auto w-full max-w-5xl">
      <InvitationReveal as="h2" id="jr-countdown-heading" className={`${styles.countdownHeading} mb-6 sm:mb-8`}>Counting down to forever</InvitationReveal>
      <Countdown />
    </div>
  </section>;
}
