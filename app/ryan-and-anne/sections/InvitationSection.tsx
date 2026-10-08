import Image from "next/image";
import pattern from "../assets/design/bg-pattern.png";
import lacedImage from "../assets/design/laced-images.png";
import { invitationMessage } from "../data/invitation";
import { wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function InvitationSection() {
  return (
    <section
      id="invitation"
      aria-labelledby="ra-invitation-title"
      className="relative isolate overflow-hidden bg-[#1b1616] px-6 py-8 text-center text-[#f5f0e6] sm:px-10 sm:py-10 lg:py-12"
    >
      <Image
        src={pattern}
        alt=""
        fill
        sizes="(min-width:640px) 100vw, max(100vw, 600px)"
        className="pointer-events-none object-cover grayscale"
      />
      <div data-reveal-group className="relative mx-auto max-w-2xl">
        <div data-reveal="image">
          <Image
            src={lacedImage}
            alt="Wedding announcement framed with ivory lace and gold flowers."
            className="mx-auto mb-8 h-auto w-56 max-w-full sm:mb-10 sm:w-64 lg:w-72"
            sizes="(min-width:1024px) 288px, (min-width:640px) 256px, 224px"
          />
        </div>
        <h2
          data-reveal
          id="ra-invitation-title"
          className={`${styles.serif} text-[1.4rem] uppercase leading-snug sm:text-3xl`}
        >
          You are invited!
        </h2>
        <div className="mx-auto mt-7 max-w-[25rem] space-y-6 text-base leading-[1.85] sm:mt-10 sm:space-y-5 sm:text-lg sm:leading-[3.25]">
          {invitationMessage.map((paragraph) => (
            <p data-reveal key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
        <p data-reveal className={`${styles.eyebrow} mt-10 sm:mt-20`}>
          With love
        </p>
        <p
          data-reveal
          className={`${styles.invitationNames} mt-2 text-[#d1b788]`}
        >
          {wedding.groomShort} and {wedding.brideShort}
        </p>
      </div>
    </section>
  );
}
