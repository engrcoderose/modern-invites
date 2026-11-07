import Image from "next/image";
import RsvpFlow from "../components/RsvpFlow";
import wedding from "../data/wedding-details.json";
import { rsvpPhoto } from "../data/rsvp";
import roses from "../assets/designs/flower-design-3.png";

export default function RsvpSection() {
  return (
    <section id="rsvp" aria-labelledby="mj-rsvp-title" className="mj-rsvp overflow-hidden px-6 py-20 sm:px-10 sm:py-24">
      <h2 id="mj-rsvp-title" className="sr-only">RSVP for Marian and Dee Jay</h2>
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div data-mj-reveal className="relative mx-auto w-full max-w-xl">
          <div className="mj-rsvp-photo relative aspect-[4/3] overflow-hidden">
            <Image src={rsvpPhoto.src} alt={rsvpPhoto.alt} fill quality={85} sizes="(min-width: 1280px) 536px, (min-width: 1024px) calc((100vw - 160px) / 2), (min-width: 656px) 576px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)" className="object-cover" style={{ objectPosition: rsvpPhoto.position }} />
          </div>
          <Image src={roses} alt="" sizes="(min-width: 640px) 144px, 96px" className="pointer-events-none absolute -left-5 -top-6 h-auto w-24 sm:-left-8 sm:-top-8 sm:w-36" />
          <Image src={roses} alt="" sizes="(min-width: 640px) 144px, 96px" className="pointer-events-none absolute -bottom-6 -right-5 h-auto w-24 rotate-180 sm:-bottom-8 sm:-right-8 sm:w-36" />
        </div>
        <div className="mx-auto w-full min-w-0 max-w-xl">
          <RsvpFlow />
          <p data-mj-reveal className="mt-8 text-center text-sm leading-7">Our celebration is reserved for our personally invited guests. Thank you for understanding.</p>
          <p data-mj-reveal className="mt-5 text-center text-sm leading-7">Questions? We’re happy to help.<br /><a className="mj-text-link" href={`tel:${wedding.contact.bridePhone.replaceAll(" ", "")}`}>Call Marian</a> · <a className="mj-text-link" href={`tel:${wedding.contact.coordinator.phone.replaceAll(" ", "")}`}>Call our coordinator</a></p>
        </div>
      </div>
    </section>
  );
}
