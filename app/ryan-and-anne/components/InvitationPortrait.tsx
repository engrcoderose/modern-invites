import Image from "next/image";
import laceFrame from "../assets/design/ivory-lace-frame-hd.png";
import { getPhoto } from "../data/prenup-media";
import styles from "../styles/wedding.module.css";
import OptimizedPhoto from "./OptimizedPhoto";

const portrait = getPhoto("staircase-candid-embrace");

export default function InvitationPortrait() {
  return (
    <div className="relative mx-auto mb-8 aspect-[4/5] w-56 max-w-full sm:mb-10 sm:w-64 lg:w-72">
      <div className={`${styles.invitationPortraitWindow} absolute inset-x-[16%] inset-y-[10%] overflow-hidden`}>
        <OptimizedPhoto
          src={portrait.src}
          alt={portrait.alt}
          fill
          quality={85}
          sizes="(min-width:1024px) 432px, (min-width:640px) 384px, 336px"
          className="object-cover"
          style={{ objectPosition: "41% 50%" }}
        />
      </div>
      <Image
        src={laceFrame}
        alt=""
        fill
        quality={85}
        sizes="(min-width:1024px) 288px, (min-width:640px) 256px, 224px"
        className="pointer-events-none object-contain"
      />
    </div>
  );
}
