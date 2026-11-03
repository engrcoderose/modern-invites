import Reveal from "../components/Reveal";
import Image from "next/image";
import vintageEnvelope from "../assets/artwork/vinatge_envelope_blue.png";
import paperTexture from "../assets/artwork/entourage-paper-texture.webp";
import DecorativeBackground from "../components/DecorativeBackground";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function EntourageSection() {
  return <section id="entourage" tabIndex={-1} className={`${styles.entourage} relative isolate scroll-mt-24 overflow-hidden px-6 py-24 sm:px-10 lg:py-40`}>
    <DecorativeBackground image={paperTexture} className={styles.entouragePaper} />
    <div aria-hidden="true" className={`${styles.entourageMark} pointer-events-none absolute inset-x-0 top-6 whitespace-nowrap text-center select-none`}>J & G</div>
    <div className="relative mx-auto max-w-6xl text-center">
      <Reveal>
        <div aria-hidden="true" className="mx-auto mb-6 w-24 sm:w-28">
          <Image src={vintageEnvelope} alt="" sizes="(max-width: 639px) 96px, 112px" className="h-auto w-full" />
        </div>
        <p className={`${styles.smallText} mb-6 flex items-center justify-center gap-3`}>
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-current" />The wedding entourage
        </p>
        <h2 className={styles.heading}>With love from<br /><em>our dearest people.</em></h2>
        <p className={`${styles.sectionIntro} mx-auto mt-7 max-w-xl`}>Together with their families, {wedding.couple.groom} and {wedding.couple.bride} request the honor of your presence.</p>
      </Reveal>
      <div className={`${styles.entourageGrid} mt-16 grid gap-x-12 gap-y-12 border-y py-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:py-20`}>{wedding.entourage.map((group,index)=><Reveal key={group.role} delay={(index%3)*120}><h3 data-reveal-item className={`${styles.smallText} mb-5`}>{group.role}</h3><ul className="space-y-2">{group.names.map(name=><li data-reveal-item className={styles.entourageName} key={name}>{name}</li>)}</ul></Reveal>)}</div>
    </div>
  </section>;
}
