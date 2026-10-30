import Reveal from "../components/Reveal";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function EntourageSection() {
  return <section id="entourage" tabIndex={-1} className={`${styles.entourage} relative scroll-mt-24 overflow-hidden px-6 py-24 sm:px-10 lg:py-40`}>
    <div aria-hidden="true" className={`${styles.ambientMark} pointer-events-none absolute inset-x-0 top-6 text-center select-none`}>J & G</div>
    <div className="relative mx-auto max-w-6xl text-center"><Reveal><h2 className={styles.heading}>With love from<br /><em>our dearest people.</em></h2><p className={`${styles.sectionIntro} mx-auto mt-7 max-w-xl`}>Together with their families, {wedding.couple.groom} and {wedding.couple.bride} request the honor of your presence.</p></Reveal>
      <div className={`${styles.entourageGrid} mt-16 grid gap-x-12 gap-y-12 border-y py-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:py-20`}>{wedding.entourage.map((group,index)=><Reveal key={group.role} delay={(index%3)*60}><h3 className={`${styles.smallText} mb-5`}>{group.role}</h3><ul className="space-y-2">{group.names.map(name=><li className={styles.entourageName} key={name}>{name}</li>)}</ul></Reveal>)}</div>
    </div>
  </section>;
}
