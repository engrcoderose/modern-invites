import RsvpForm from "../components/RsvpForm";
import SectionFlorals from "../components/SectionFlorals";
import styles from "../styles/invitation.module.css";

export default function RsvpSection() {
  return <section id="rsvp" aria-labelledby="jr-rsvp-title" className="relative isolate scroll-mt-20 px-6 py-20 md:px-12 md:py-28">
    <SectionFlorals mirrored largeScreen />
    <h2 id="jr-rsvp-title" className="sr-only">RSVP</h2>
    <div className={`${styles.rsvpForm} mx-auto w-full min-w-0 max-w-xl`}><RsvpForm /></div>
  </section>;
}
