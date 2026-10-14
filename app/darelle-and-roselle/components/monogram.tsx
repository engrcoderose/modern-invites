"use client";

import { useId } from "react";
import Image from "next/image";
import { media } from "../data/media";
import styles from "../styles/invitation.module.css";

export default function Monogram({
  className = "",
  framed = true,
  tone = "original",
  priority = false,
  sizes = "290px",
  onReady,
}: {
  className?: string;
  framed?: boolean;
  tone?: "original" | "paper";
  priority?: boolean;
  sizes?: string;
  onReady?: () => void;
}) {
  const filterId = `dr-monogram-${useId().replace(/:/g, "")}`;
  const source = framed ? (tone === "paper" ? media.openingMonogram : media.framedMonogram) : media.monogram;
  // The supplied artwork uses white or RGB(139, 155, 119) for its canvas.
  // Key that canvas out while preserving the artwork's antialiased edges.
  const sageRed = 139 / 255;
  const alphaScale = framed ? (tone === "paper" ? -1 : -1 / (1 - sageRed)) : 1 / (1 - sageRed);
  const alphaOffset = framed ? -alphaScale : -sageRed / (1 - sageRed);
  return (
    <span data-dr-monogram-kind={framed ? "framed" : "initials"} role="img" aria-label={`Darell and Roselle’s DR monogram${framed ? " inside the ornamental oval frame" : ""}`} className={`relative block overflow-hidden ${framed ? "aspect-[320/413]" : "aspect-[73/61]"} ${className}`}>
      <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute h-0 w-0">
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
              <feColorMatrix in="SourceGraphic" type="matrix" values={`0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${alphaScale} 0 0 0 ${alphaOffset}`} result="artworkAlpha" />
              <feFlood floodColor={tone === "paper" ? "var(--dr-paper)" : "#8b9b77"} />
              <feComposite in2="artworkAlpha" operator="in" />
            </filter>
          </defs>
      </svg>
      <Image src={source} alt="" priority={priority} sizes={sizes} className={`absolute ${framed ? styles.framedMonogramImage : styles.initialsMonogramImage}`} style={{ filter: `url(#${filterId})` }} onLoad={onReady} onError={onReady} />
    </span>
  );
}
