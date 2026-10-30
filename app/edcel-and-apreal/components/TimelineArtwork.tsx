import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import arrival from "../assets/timeline/guest_arrival.png";
import ceremony from "../assets/timeline/ceremony.png";
import programStarts from "../assets/timeline/program_starts.png";
import programEnds from "../assets/timeline/program_ends.png";
import { wedding } from "../data/wedding";
import styles from "../styles/timeline.module.css";

const artwork = { arrival, ceremony, programStarts, programEnds };
type Artwork = (typeof wedding.timeline)[number]["artwork"];

export default function TimelineArtwork({ name }: { name: Artwork }) {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex h-16 w-20 items-center justify-center sm:h-24 sm:w-28"
    >
      {name === "cocktails" ? (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-full w-full"
        >
          <g transform="rotate(12 42 64)">
            <path d="M30 15h24l-1 28c-.4 13-5 20-11 20s-10.6-7-11-20l-1-28Z M31 34c8-5 15 5 22 0 M42 63v39 M29 103c6-3 20-3 26 0" />
            <path d="m35 23 1 19" opacity=".55" />
          </g>
          <g transform="rotate(-12 78 64)">
            <path d="M66 15h24l-1 28c-.4 13-5 20-11 20s-10.6-7-11-20l-1-28Z M67 34c8 5 15-5 22 0 M78 63v39 M65 103c6-3 20-3 26 0" />
            <path d="m71 23 1 19" opacity=".55" />
          </g>
          <path d="M60 7V2 M49 8l-3-4 M71 8l3-4" />
        </svg>
      ) : (
        <span className={`${styles.artwork} block h-full w-full`} style={{ "--timeline-artwork": `url("${getImageProps({ src: artwork[name], alt: "", width: 112, height: 96 }).props.src}")` } as CSSProperties} />
      )}
    </div>
  );
}
