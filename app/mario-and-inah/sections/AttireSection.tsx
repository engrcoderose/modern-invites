import Image from "next/image";
import FloralArtwork from "../components/FloralArtwork";
import { attireInspiration } from "../data/artwork";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function AttireSection() {
  return (
    <section id="attire" aria-labelledby="mi-attire-title" className={`${styles.lilac} px-6 py-20 sm:px-10 md:py-28 lg:px-16`}>
      <div className="mx-auto max-w-4xl text-center">
        <FloralArtwork reveal name="heroRight" className="mx-auto mb-6 h-auto w-24 sm:w-28" sizes="(min-width: 640px) 112px, 96px" />
        <h2 data-reveal="heading" id="mi-attire-title" className={styles.heading}>The Dresscode</h2>
        <p data-reveal="text" className={`${styles.smallHeading} mt-7`}>{wedding.attire.title}</p>
        <p data-reveal="text" data-reveal-delay="0.08" className="mx-auto mt-4 max-w-lg text-sm leading-7">Please wear pastel colors and keep it semi casual. Take inspiration from the outfits below.</p>
        <figure data-reveal="photo" className="mx-auto mt-10 overflow-hidden">
          <Image src={attireInspiration} alt="Pastel semi-casual outfit ideas: blush, lilac and sage dresses, pastel shirts and light trousers."
            sizes="(min-width: 1024px) 896px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)" className="h-auto w-full" />
        </figure>
        <div className={`${styles.attireNotes} mx-auto mt-12 max-w-2xl space-y-4 border-t pt-7 text-sm leading-7`}>
          <p data-reveal="text"><strong><em>{wedding.attire.noteLabel}</em></strong>{" "}{wedding.attire.note}</p>
          <p data-reveal="text">{wedding.attire.footwear}</p>
        </div>
      </div>
    </section>
  );
}
