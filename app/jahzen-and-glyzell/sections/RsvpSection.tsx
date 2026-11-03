import { wedding } from "../data/wedding";
import Reveal from "../components/Reveal";
import SamplePhoto from "../components/SamplePhoto";
import { photos } from "../data/photos";
import RsvpPreviewFlow from "../components/RsvpPreviewFlow";
import styles from "../styles/invitation.module.css";

export default function RsvpSection() {
  return <section id="rsvp" tabIndex={-1} aria-labelledby="jg-rsvp-title" className={`${styles.rsvp} scroll-mt-24 px-6 py-20 sm:px-10 sm:py-28`}>
    <h2 id="jg-rsvp-title" className="sr-only">Kindly reply</h2>
    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
      <Reveal stagger={false} className="mx-auto w-full max-w-md">
        <div className="relative aspect-[3/4] overflow-hidden"><SamplePhoto src={photos.portrait} alt="A couple sharing a quiet moment together" sizes="(max-width: 495px) calc(100vw - 48px), (max-width: 1023px) 448px, min(calc(45vw - 64.8px), 448px)" position="center 35%" /></div>
      </Reveal>
      <Reveal className={`${styles.rsvpForm} mx-auto w-full min-w-0 max-w-xl`}>
        <RsvpPreviewFlow />
        <div className={`${styles.rsvpNote} mt-8 space-y-2 text-center`}>
          <p>Kindly respond on or before <strong>{wedding.rsvpDeadline}.</strong></p>
          <p>Please respond only for the guests named on your invitation.</p>
        </div>
      </Reveal>
    </div>
  </section>;
}
