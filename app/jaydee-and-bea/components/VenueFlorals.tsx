import Image from "next/image";
import flowers from "../assets/designs/countdown-timer-flowers-watercolor.png";
import styles from "../styles/venue.module.css";

// Both edges share the same responsive image, preserving the original flower proportions.
const FLOWER_SIZES = "(min-width: 960px) 100vw, 960px";

export default function VenueFlorals() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-40 sm:opacity-50">
      {(["top", "bottom"] as const).map((edge) => (
        <div key={edge} className={`${edge === "top" ? styles.topWash : styles.bottomWash} absolute inset-x-0 ${edge === "top" ? "top-0" : "bottom-0 lg:hidden"} h-[540px] sm:h-[640px] lg:h-full`}>
          {(["left", "right"] as const).map((side) => (
            <div key={side} className={`${side === "left" ? styles.leftEdge : styles.rightEdge} absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} w-[24%] max-w-[380px]`}>
              <Image src={flowers} alt="" sizes={FLOWER_SIZES} loading="lazy" draggable={false}
                className={`absolute ${edge === "top" ? "top-0" : "bottom-0 -scale-y-100"} ${side === "left" ? "left-0" : "right-0"} h-auto w-[max(100vw,960px)] max-w-none`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
