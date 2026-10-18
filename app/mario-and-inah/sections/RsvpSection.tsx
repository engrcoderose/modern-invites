import RsvpForm from "../components/RsvpForm";
import PhotoFrame from "../components/PhotoFrame";
import FloralArtwork from "../components/FloralArtwork";
import { photos } from "../data/photos";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function RsvpSection() {
  return (
    <section id="rsvp" aria-labelledby="mi-rsvp-title" className="overflow-hidden px-6 py-20 sm:px-10 md:py-28 lg:px-16">
      <h2 id="mi-rsvp-title" className="sr-only">Kindly reply</h2>
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.9fr_1.2fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-xl">
          <PhotoFrame photo={photos.rsvp} className="aspect-[4/3] w-full" sizes="(min-width: 1408px) 515px, (min-width: 1024px) calc((100vw - 208px) * .429), (min-width: 640px) 576px, calc(100vw - 48px)" />
          <FloralArtwork name="timelineUpper" className="absolute -left-5 -top-8 h-auto w-28 sm:-left-8 sm:w-40" sizes="(min-width: 640px) 160px, 112px" />
          <FloralArtwork name="timelineLower" className="absolute -bottom-8 -right-5 h-auto w-28 rotate-180 -scale-x-100 sm:-right-8 sm:w-40" sizes="(min-width: 640px) 160px, 112px" />
        </div>
        <div className="min-w-0">
          <p className={`${styles.serifDetail} mb-6 text-center text-xs uppercase tracking-[.2em]`}>Celebrate with us</p>
          <RsvpForm />
          <p className={`${styles.serifDetail} mt-8 text-center text-sm leading-7`}>Please reply by {wedding.rsvp.deadline}.</p>
        </div>
      </div>
    </section>
  );
}
