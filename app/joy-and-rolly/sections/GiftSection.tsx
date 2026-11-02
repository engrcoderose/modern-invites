import Image from "next/image";
import InvitationReveal from "../components/InvitationReveal";
import SectionFlorals from "../components/SectionFlorals";
import { gifts } from "../data/gifts";
import styles from "../styles/invitation.module.css";

export default function GiftSection() {
  return <section id="gifts" aria-labelledby="jr-gifts-title" className={`${styles.venueSection} relative isolate flex min-h-svh scroll-mt-20 items-center px-6 py-20 md:px-12 md:py-28`}>
    <SectionFlorals mirrored />
    <div className="mx-auto w-full max-w-2xl text-center">
      <InvitationReveal as="h2" id="jr-gifts-title" className={styles.heading}>A Note on Gifts</InvitationReveal>
      <InvitationReveal as="p" delay={0.06} className="mx-auto mt-6 max-w-[50ch] text-base leading-8">{gifts.message}</InvitationReveal>
      {gifts.qrCode && <InvitationReveal delay={0.12} className="mx-auto mt-10 w-full max-w-64">
        <a href={gifts.qrCode.image.src} target="_blank" rel="noopener noreferrer" aria-label="View the gift QR code at full size" className="block bg-white p-4">
          <Image src={gifts.qrCode.image} alt={gifts.qrCode.alt} unoptimized className="h-auto w-full" />
        </a>
      </InvitationReveal>}
    </div>
  </section>;
}
