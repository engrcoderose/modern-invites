"use client";

import Image from "next/image";
import RsvpFlow from "../components/rsvp/RsvpFlow";
import { wedding } from "../data/wedding";
import { artwork, photos } from "../data/media";
import styles from "../styles/invitation.module.css";
import rsvpStyles from "../styles/rsvp.module.css";

export default function RsvpSlide() {
  return <div className="relative h-full">
    {photos.rsvp.src && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[42%] sm:h-full">
      <Image src={photos.rsvp.src} alt="" fill sizes={photos.rsvp.sizes} quality={photos.rsvp.quality} placeholder={typeof photos.rsvp.src === "object" ? "blur" : "empty"} className="object-cover" style={{ objectPosition: photos.rsvp.position }} />
      <div className={`${styles.rsvpPhotoWash} absolute inset-0`} />
    </div>}
    <div data-invitation-scroll tabIndex={0} role="region" aria-label="RSVP form" className={`${styles.sponsorScroller} absolute inset-0 overflow-y-auto overscroll-contain outline-none`}>
      <div className="relative mx-auto flex min-h-full w-full max-w-[624px] flex-col items-center justify-center gap-7 px-4 py-8 text-center sm:px-8">
        <div data-cr-reveal className={`${rsvpStyles.plaque} relative w-[245px] max-w-[85%] shrink-0 px-7 py-5`}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-3 flex justify-center">
            <span className={`${rsvpStyles.plaqueOrnament} relative h-6 w-[76px] rounded-full`}><Image src={artwork.ornament} alt="" fill sizes="76px" className="object-cover object-[50%_34%]" /></span>
          </div>
          <h2 className={rsvpStyles.heading}>Kindly RSVP</h2>
        </div>
        <div className={`${rsvpStyles.card} w-full shrink-0 rounded-md border px-[22px] py-6 sm:px-[35px] sm:py-[30px]`}>
          <p data-cr-reveal className="text-[13px] leading-6">Please respond by <strong className="font-medium">{wedding.deadline}</strong></p>
          <RsvpFlow />
        </div>
      </div>
    </div>
  </div>;
}
