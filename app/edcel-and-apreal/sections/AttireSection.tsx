import Image from "next/image";
import SectionHeading from "../components/SectionHeading";
import VintageAccent from "../components/VintageAccent";
import DecorativeParallax from "../components/DecorativeParallax";
import principalSponsors from "../assets/attire/principal-sponsors-attire.png";
import guestOutfits from "../assets/attire/guest-outfit-inspiration.png";
import guestOutfitsMobile from "../assets/attire/guest-outfit-inspiration-mobile.png";
import attireBackground from "../assets/backgrounds/attire-burgundy-fabric.webp";
import { attireGuide } from "../data/attire";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function AttireSection() {
  return <section id="attire" aria-labelledby="ea-attire-title" className={`${styles.attire} relative overflow-hidden px-6 py-20 sm:px-10 md:py-28`}>
    <Image src={attireBackground} alt="" aria-hidden="true" fill sizes="100vw" loading="lazy" className="pointer-events-none object-cover" />
    <div className="relative mx-auto max-w-5xl text-center">
      <VintageAccent variant="goldButton" className="mx-auto mb-7 w-14" sizes="56px" />
      <SectionHeading id="ea-attire-title" description="Dress for an evening of love and celebration.">Attire Guide</SectionHeading>
      <div className="mx-auto grid max-w-4xl grid-cols-2 items-center gap-x-5 gap-y-6 md:grid-cols-[1fr_minmax(0,360px)_1fr] md:gap-x-4" data-reveal>
        <figure className="col-span-2 mx-auto w-full max-w-[320px] md:col-span-1 md:col-start-2 md:row-start-1 md:max-w-[360px]">
          <DecorativeParallax decorative={false} distance={8}>
            <Image src={principalSponsors} alt="Principal sponsor outfit inspiration: an old-rose satin evening gown and a black suit with a burgundy tie."
              sizes="(min-width: 768px) 360px, (min-width: 368px) 320px, calc(100vw - 48px)" className="h-auto w-full" />
          </DecorativeParallax>
        </figure>
        {attireGuide.sponsors.map(({ role, outfit }, index) => <div key={role} className={index === 0 ? "md:col-start-1 md:row-start-1" : "md:col-start-3 md:row-start-1"}>
          <h3 className={`${styles.attireTitle} text-4xl md:text-5xl`}>{role}</h3>
          <p className="mx-auto mt-2 max-w-[160px] text-[11px] uppercase leading-6 tracking-[.06em] sm:text-xs">{outfit}</p>
        </div>)}
      </div>
      <div className="mt-14 md:mt-16" data-reveal>
        <h3 className={`${styles.attireTitle} text-5xl sm:text-6xl`}>Guests</h3>
        <p className="mt-4 text-xs uppercase tracking-[.12em] sm:text-sm">{attireGuide.guestDressCode}</p>
        <p className={`${styles.body} mx-auto mt-4 max-w-xl`}>{wedding.attire.note}</p>
        <ul aria-label="Suggested guest attire colors" className="mx-auto mt-8 grid max-w-md grid-cols-9 gap-1 sm:gap-2">
          {attireGuide.palette.map(({ name, color }) => <li key={name}>
            <span aria-hidden="true" className={`${styles.swatch} block aspect-square w-full rounded-full`} style={{ backgroundColor: color }} />
            <span className="sr-only">{name}</span>
          </li>)}
        </ul>
      </div>
      <figure className="mt-10 md:mt-12" data-reveal>
        <DecorativeParallax decorative={false} distance={8} reverse>
        <Image src={guestOutfits} alt="Ten semi-formal guest outfit examples in wine red, burgundy, old rose, mauve, beige and champagne: dresses, elegant separates and collared shirts with tailored trousers."
          sizes="(min-width: 1104px) 1024px, calc(100vw - 80px)" className="hidden h-auto w-full md:block" />
        <Image src={guestOutfitsMobile} alt="Ten semi-formal guest outfit examples arranged in two rows: wine and burgundy separates, old-rose and rose-taupe dresses, beige and mauve shirts, and a champagne-gold dress."
          sizes="(min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)" className="h-auto w-full md:hidden" />
        </DecorativeParallax>
        <figcaption className={`${styles.smallNote} mt-5 text-xs`}>A little inspiration for an evening of celebration.</figcaption>
      </figure>
    </div>
  </section>;
}
