import Image from "next/image";
import Link from "next/link";
import { portfolioItems } from "@/lib/portfolio";
import aljayMonogram from "@/app/aljay-and-erlyn/assets/design/wedding-log.png";
import aljayGarden from "@/app/aljay-and-erlyn/assets/design/whimsical-garden-background.png";
import { SunlitPortrait } from "@/app/anjo-and-jasmin/prenup-media";
import { prenupMedia } from "@/app/edcel-and-apreal/data/photo-media";
import { getPhoto } from "@/app/ryan-and-anne/data/prenup-media";
import styles from "./hero.module.css";

// Use the same published artwork and destinations as the portfolio.
const previews = [
  { id: "adi-and-jules", image: SunlitPortrait },
  { id: "aljay-and-erlyn", image: aljayGarden },
  { id: "edcel-and-apreal", image: prenupMedia["burgundy-gown-terrace-linked-arms-full-length.webp"] },
  { id: "ryan-and-anne", image: getPhoto("cafe-doorway-facing-portrait").src },
];
const invitations = previews.flatMap(({ id, image }) => {
  const invitation = portfolioItems.find((item) => item.id === id);
  return invitation ? [{ ...invitation, image }] : [];
});

export default function HeroInvitationPreviews() {
  return (
    <ul
      aria-label="Explore our invitation designs"
      className={`${styles.previews} mx-auto flex w-fit max-w-full items-center justify-center p-0`}
    >
      {invitations.map((invitation) => (
        <li key={invitation.id} className={`${styles.phone} relative shrink-0`}>
          <Link
            href={invitation.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${invitation.title} invitation (opens in a new tab)`}
            className={`${styles.phoneLink} relative block h-full overflow-hidden`}
            data-invitation={invitation.id}
          >
            <Image
              src={invitation.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1152px) 136px, (min-width: 640px) 12.5vw, 24vw"
              className="object-cover object-center"
            />
            <div className={`${styles.previewShade} absolute inset-0`} />
            <div
              aria-hidden="true"
              className={`${styles.notch} absolute left-1/2 top-0 z-20 -translate-x-1/2`}
            />
            <div
              aria-hidden="true"
              className={`${styles.previewContent} absolute inset-0 flex flex-col items-center justify-end px-2 pb-[22%] text-center`}
            >
              {invitation.id === "aljay-and-erlyn" ? (
                <Image
                  src={aljayMonogram}
                  alt=""
                  sizes="(min-width: 640px) 100px, 70px"
                  className="relative mb-[22%] h-auto w-[88%]"
                />
              ) : (
                <>
                  <span className={styles.previewIntro}>The wedding of</span>
                  <span className={`${styles.previewNames} mt-2`}>
                    {invitation.title.split(" & ")[0]}
                    <span className="my-1 block">&amp;</span>
                    {invitation.title.split(" & ")[1]}
                  </span>
                  <span
                    className={`${styles.previewRule} mt-3 block h-px w-1/3`}
                  />
                  <span className={`${styles.previewFooter} mt-3`}>
                    Together with our families
                  </span>
                </>
              )}
            </div>
            <span
              aria-hidden="true"
              className={`${styles.homeIndicator} absolute bottom-[2%] left-1/2 h-0.5 w-1/3 -translate-x-1/2 rounded-full`}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
