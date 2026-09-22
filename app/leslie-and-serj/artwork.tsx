import Image from "next/image";
import monogram from "./assets/designs/Monogram.png";

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

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span aria-label="Leslie and Serj" className={`lj-monogram ${className}`}>
      <Image src={monogram} alt="" fill sizes="240px" />
    </span>
  );
}
