import Image, { getImageProps } from "next/image";
import { Download } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { giftBackground, giftMessage, giftOptions } from "../data/gifts";
import styles from "../styles/invitation.module.css";

const { props: desktopBackground } = getImageProps({ src: giftBackground.desktop, alt: "", fill: true, sizes: "100vw" });
const { props: mobileBackground } = getImageProps({ src: giftBackground.mobile, alt: "", fill: true, sizes: "100vw" });

export default function GiftsSection() {
  return <section id="gifts" aria-labelledby="ea-gifts-title" className={`${styles.gifts} relative isolate overflow-hidden px-6 py-20 sm:px-10 md:py-24`}>
    <picture className="pointer-events-none absolute inset-0">
      <source media="(min-width: 768px)" srcSet={desktopBackground.srcSet} sizes={desktopBackground.sizes} />
      {/* getImageProps preserves Next optimization while picture selects one responsive artwork. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...mobileBackground} alt="" className="object-cover" />
    </picture>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/10" />
    <div className="relative mx-auto max-w-3xl text-center">
      <SectionHeading id="ea-gifts-title">A note on gifts</SectionHeading>
      <p className={`${styles.body} mx-auto max-w-2xl`}>{giftMessage}</p>
      <div className="mx-auto mt-10 grid max-w-xl gap-6 sm:grid-cols-2 sm:gap-8" data-text-motion-skip>
        {giftOptions.map(({ bank, qr, filename }) => <figure key={bank} className={`${styles.giftCard} mx-auto w-full max-w-72 p-5 sm:p-6`}>
          <figcaption className="mb-5 text-sm font-semibold tracking-[.08em]">{bank}</figcaption>
          <div className="bg-white p-4">
            <Image src={qr} alt={`${bank} gift QR code supplied by Edcel and Apreal`} unoptimized loading="lazy" className="h-auto w-full" />
          </div>
          <a href={qr.src} download={filename} aria-label={`Save ${bank} gift QR code`}
            className={`${styles.textLink} mt-4 inline-flex min-h-11 items-center justify-center gap-2 px-2 py-2 text-xs`}>
            <Download size={15} strokeWidth={1.5} aria-hidden="true" />Save QR code
          </a>
        </figure>)}
      </div>
    </div>
  </section>;
}
