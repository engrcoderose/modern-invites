import Reveal from "../components/Reveal";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { wedding } from "../data/wedding";
import dressCodeGuide from "../assets/attire/dress-code-guide.webp";
import styles from "../styles/invitation.module.css";

export default function AttireSection() {
  return (
    <section id="details" tabIndex={-1} className={`${styles.attire} scroll-mt-24 px-6 py-24 sm:px-10 lg:py-40`}>
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
        <div>
          <Reveal><h2 className={styles.attireHeading}>A little elegance.<br />A little you.</h2><h3 className={`${styles.subheading} mt-7`}>Formal attire</h3></Reveal>
          <Reveal className="mt-5 max-w-xl space-y-5">
            <p className={styles.prose}><strong>Gentlemen.</strong> {wedding.attire.gentlemen}</p>
            <p className={styles.prose}><strong>Ladies.</strong> {wedding.attire.ladies}</p>
            <p className={styles.prose}>{wedding.attire.reservedNote}</p>
          </Reveal>
        </div>
        <Reveal stagger={false} className="mx-auto w-full max-w-[360px] lg:ml-auto lg:mr-0">
          <figure>
            <a href={dressCodeGuide.src} target="_blank" rel="noreferrer" aria-label="View the full-size dress-code guide (opens in a new tab)" className="block">
              <span className={`${styles.attireGuide} block rotate-[2deg] p-2`}>
                <Image src={dressCodeGuide} alt="Formal dress-code guide: navy blue, espresso and gold. White is reserved for the bride, and mocha brown for the groom."
                  sizes="(max-width: 423px) calc(100vw - 64px), 344px" quality={85} className="h-auto w-full" />
              </span>
              <span className={`${styles.textLink} mt-6 inline-flex min-h-11 items-center gap-3`}>View full-size guide <ArrowUpRight size={15} aria-hidden="true" /></span>
            </a>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

