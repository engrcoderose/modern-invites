import Image from "next/image";
import { media } from "../data/media";
import { wedding } from "../data";

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 170 34"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth=".9">
        <path d="M0 17h52c19 0 15-16 5-12-9 4 7 20 28 12 21 8 37-8 28-12-10-4-14 12 5 12h52M63 23c13 7 17-2 22-6 5 4 9 13 22 6" />
        <path d="m85 7 4 10-4 10-4-10Z" />
        <circle cx="40" cy="17" r="2" />
        <circle cx="130" cy="17" r="2" />
      </g>
    </svg>
  );
}

function StationeryCorner({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <g stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path d="M6 70V34C6 18 18 6 34 6H70M14 62V36C14 24 24 14 36 14H62" />
        <path d="M8 40C28 40 40 28 40 8M23 23l4-8 4 8-4 8-4-8Z" />
        <circle cx="6" cy="74" r="1.5" />
        <circle cx="74" cy="6" r="1.5" />
      </g>
    </svg>
  );
}

export function StationeryCorners() {
  return (
    <div
      className="op-stationery-corners pointer-events-none absolute inset-x-0 top-0 bottom-[var(--op-controls-height)] z-[2]"
      aria-hidden="true"
    >
      <StationeryCorner className="absolute left-5 top-5 size-[76px] [@media(max-width:700px)]:left-3 [@media(max-width:700px)]:top-3 [@media(max-width:700px)]:size-12" />
      <StationeryCorner className="absolute bottom-5 right-5 size-[76px] rotate-180 [@media(max-width:700px)]:bottom-3 [@media(max-width:700px)]:right-3 [@media(max-width:700px)]:size-12" />
    </div>
  );
}

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span aria-label={wedding.title} className={`op-monogram ${className}`}>
      <Image src={media.monogram} alt="" fill sizes="240px" />
    </span>
  );
}
