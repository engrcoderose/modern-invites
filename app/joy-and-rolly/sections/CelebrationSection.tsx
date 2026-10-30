import Image from "next/image";
import InvitationReveal from "../components/InvitationReveal";
import venueFlowers from "../assets/venue-lavender-corner.webp";
import floralSpray from "../assets/floral-spray.webp";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function CelebrationSection() {
  return <section id="celebration" className={`${styles.venueSection} relative isolate scroll-mt-20`}>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
      <Image src={venueFlowers} alt="" sizes="(min-width: 768px) 200px, 110px"
        className="absolute -left-4 -top-8 h-auto w-[110px] rotate-180 md:w-[200px]" />
      <Image src={venueFlowers} alt="" sizes="(min-width: 768px) 200px, 110px"
        className="absolute bottom-8 -right-4 h-auto w-[110px] md:bottom-12 md:w-[200px]" />
    </div>
    <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-20 md:px-12 md:py-28">
      <InvitationReveal as="h2" className={`${styles.heading} text-center`}>The Venues</InvitationReveal>
      <p className="mx-auto mt-5 max-w-lg text-center text-base sm:text-sm leading-7">Two hearts, one promise, and our favorite people.<br />We can’t wait to celebrate with you.</p>
      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
        {wedding.venues.map((venue, index) => <InvitationReveal key={venue.label} delay={index * 0.12}>
          <article className="text-center">
            <div className={`${styles.venuePhotoFrame} relative mb-10 p-2 sm:p-3`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={venue.image.src} alt={venue.image.alt} fill
                  sizes="(min-width: 1152px) 470px, (min-width: 768px) calc((100vw - 212px) / 2), (min-width: 640px) calc(100vw - 74px), calc(100vw - 66px)"
                  className="object-cover" />
              </div>
              <Image src={floralSpray} alt="" aria-hidden="true" sizes="(min-width: 768px) 144px, 104px"
                className="pointer-events-none absolute -bottom-5 -right-2 h-auto w-[104px] select-none md:-bottom-6 md:-right-3 md:w-36" />
            </div>
            <h3 className={`${styles.serif} text-3xl`}>{venue.label}</h3>
            <p className={`${styles.venueName} mx-auto mt-5 max-w-sm text-2xl leading-snug`}>{venue.name}</p>
            <p className="mt-4 text-base sm:text-sm font-medium">{venue.time}</p>
            <p className={`${styles.muted} mx-auto mt-3 min-h-14 max-w-[38ch] text-base sm:text-sm leading-7`}>{venue.address}</p>
          </article>
        </InvitationReveal>)}
      </div>
    </div>
  </section>;
}
