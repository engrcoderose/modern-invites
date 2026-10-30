import Reveal from "../components/Reveal";
import SamplePhoto from "../components/SamplePhoto";
import { photos, photoSizes } from "../data/photos";
import styles from "../styles/invitation.module.css";

export default function InvitationSection() {
  return <section id="invitation-message" className={`${styles.paper} relative overflow-hidden px-6 py-24 sm:px-10 lg:py-40`}>
    <div aria-hidden="true" className={`${styles.ambientMark} pointer-events-none absolute -right-8 top-0 select-none`}>&</div>
    <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
      <Reveal className="relative mx-auto w-full max-w-lg"><div className="aspect-[4/5]"><SamplePhoto src={photos.invitation} alt="Sample photograph of a couple walking, awaiting Jahzen and Glyzell’s photos" sizes={photoSizes.invitation} /></div><span aria-hidden="true" className={`${styles.signatureSeal} absolute -bottom-8 right-0 flex size-24 items-center justify-center sm:-right-8`}>J&G</span></Reveal>
      <Reveal><h2 className={styles.heading}>To love, laughter,<br /><em>and forever.</em></h2><p className={`${styles.prose} mt-8 max-w-xl`}>Together with our families, we joyfully invite you to celebrate our wedding. Join us as we begin a marriage shaped by faith, mutual understanding, and enduring love.</p><p className={`${styles.signature} mt-10`}>With all our love</p><p className={`${styles.smallText} mt-3`}>Jahzen & Glyzell</p></Reveal>
    </div>
  </section>;
}

