import Image from "../components/OptimizedPhoto";
import RsvpFlow from "../components/RsvpFlow";
import { sectionPhotos } from "../data/section-photos";
import { wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function RsvpSection() {
  const photo = sectionPhotos.rsvp;
  return (
    <section
      id="rsvp"
      aria-labelledby="ra-rsvp-title"
      className={`${styles.paper} px-6 py-24 sm:px-10 md:py-32 lg:px-16`}
    >
      <h2 id="ra-rsvp-title" className="sr-only">RSVP</h2>
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div data-reveal="image" className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width:1024px) min(504px, calc(50.625vw - 97.2px)), (min-width:496px) 504px, calc(112.5vw - 54px)"
            className="object-cover"
          />
        </div>
        <div data-reveal className="mx-auto w-full min-w-0 max-w-2xl">
          <p className={`${styles.eyebrow} mb-6 text-center`}>Celebrate with us</p>
          <RsvpFlow eventSlug={wedding.rsvpEventSlug} />
          <p className="mt-8 text-center text-sm leading-7 text-[#615b50]">
            Please reply by <span className="font-medium">{wedding.rsvpDeadline}</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
