"use client";

import { useId, useState } from "react";
import Image from "next/image";
import FloralBorder from "../../jasmin-and-anjo/assets/images/designs/floral-designs.png";

export default function WelcomeFlorals() {
  const filterId = useId();
  const [ready, setReady] = useState(false);

  return (
    <div aria-hidden="true" data-ready={ready} className="aj-welcome-florals pointer-events-none absolute -inset-x-5 -inset-y-8 overflow-hidden">
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -3 -3 -3 0 8.7" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>
      <div className="absolute -left-[5.7%] top-0 h-full w-[clamp(140px,19vw,260px)] -scale-x-100 max-[600px]:-left-[60px] max-[600px]:w-[150px]">
        <div className="aj-welcome-floral-bloom relative h-full w-full origin-bottom">
          <Image src={FloralBorder} alt="" fill priority sizes="(max-width: 600px) 150px, 260px" onLoad={() => setReady(true)} className="object-fill" style={{ filter: `url(#${filterId})` }} />
        </div>
      </div>
      <div className="aj-welcome-florals-right absolute -right-[5.7%] top-0 h-full w-[clamp(140px,19vw,260px)] max-[600px]:-right-[60px] max-[600px]:w-[150px]">
        <div className="aj-welcome-floral-bloom relative h-full w-full origin-bottom">
          <Image src={FloralBorder} alt="" fill priority sizes="(max-width: 600px) 150px, 260px" className="object-fill" style={{ filter: `url(#${filterId})` }} />
        </div>
      </div>
    </div>
  );
}
