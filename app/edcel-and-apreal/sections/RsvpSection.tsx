import Image from "next/image";
import RsvpForm from "../components/RsvpForm";
import VintageAccent from "../components/VintageAccent";
import { prenupMedia } from "../data/photo-media";
import { rsvpContacts } from "../data/guest-notes";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const rsvpPhoto = prenupMedia["ivory-dress-forehead-kiss.webp"];

export default function RsvpSection() {
  return <section id="rsvp" aria-labelledby="ea-rsvp-title" className={`${styles.rsvp} relative overflow-hidden px-6 py-20 sm:px-10 md:py-28`}>
    <h2 id="ea-rsvp-title" className="sr-only">Kindly response</h2>
    <VintageAccent variant="laceBow" className="absolute -left-6 top-24 hidden w-28 xl:block" sizes="112px" />
    <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
      <figure className={`${styles.rsvpPhoto} relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm`}>
        <Image src={rsvpPhoto} alt="Edcel kisses Apreal’s forehead as they hold hands" fill sizes="(max-width: 495px) calc(100vw - 48px), 448px" className="object-cover" />
      </figure>
      <div className="mx-auto w-full min-w-0 max-w-2xl">
        <VintageAccent variant="butterfly" className="mx-auto mb-7 w-16" sizes="64px" />
        <RsvpForm />
        <p className={`${styles.smallNote} mt-8 text-center text-sm`}>Kindly respond by {wedding.rsvp.deadline}.</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-center text-sm">
          {rsvpContacts.map((contact) => <a key={contact.name} href={contact.href} className={`${styles.textLink} inline-flex min-h-11 items-center`}>{contact.name} · {contact.display}</a>)}
        </div>
      </div>
    </div>
  </section>;
}
