import Image from "next/image";
import InvitationReveal from "../components/InvitationReveal";
import { photoSharing } from "../data/photo-sharing";
import styles from "../styles/invitation.module.css";

export default function PhotoSharingSection() {
  return <section id="photo-sharing" aria-labelledby="jr-photo-sharing-title" className={`${styles.lavenderSection} flex min-h-svh scroll-mt-20 items-center px-6 py-20 md:px-12 md:py-28`}>
    <div className="mx-auto grid w-full max-w-4xl items-center gap-10 text-center md:grid-cols-[minmax(0,1fr)_16rem] md:gap-16 md:text-left">
      <div className="min-w-0">
        <InvitationReveal as="h2" id="jr-photo-sharing-title" className={styles.heading}>{photoSharing.title}</InvitationReveal>
        <InvitationReveal as="p" delay={0.06} className="mx-auto mt-6 max-w-[42ch] text-base leading-8 md:mx-0">{photoSharing.message}</InvitationReveal>
      </div>
      <InvitationReveal delay={0.12} className="mx-auto w-full max-w-64">
        <div className="bg-white p-6">
          <Image src={photoSharing.qrCode} alt="QR code to share photos from Joy and Rolly’s wedding" unoptimized className="h-auto w-full" />
        </div>
        <p className={`${styles.muted} mt-4 text-sm leading-6`}>Scan to share your photos.</p>
      </InvitationReveal>
    </div>
  </section>;
}
