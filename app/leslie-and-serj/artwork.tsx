import Image from "next/image";
import monogram from "./assets/designs/Monogram.png";

// Original, decorative line art inspired by the invitation's garden-arch motif.
// This is not a depiction of either wedding venue.
export function GardenArch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 680 490"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M80 434h520M45 447h589M111 459h483M146 429V215C146 92 534 92 534 215v214M160 427V218C160 111 520 111 520 218v209M177 427V224C177 137 503 137 503 224v203" />
        <path d="M135 221h410M135 230h410M144 213h391M167 169h348M211 137h258M278 116h124M151 230l25 26M530 230l-26 26M146 412h32M502 412h32" />
        {[193, 218, 243, 268, 293, 318, 343, 368, 393, 418, 443, 468, 493].map(
          (x, i) => (
            <path
              key={x}
              d={`M${x} 229v198M${x} ${164 - Math.sin((i / 12) * Math.PI) * 39}v${i === 0 || i === 12 ? 37 : 48}`}
              opacity=".64"
            />
          ),
        )}
        <path d="M179 269Q259 213 339 269Q419 213 500 269M179 278Q259 222 339 278Q419 222 500 278M179 315h321M179 323h321M179 394h321M179 400h321M338 266v161M342 266v161M329 338v18M351 338v18" />
        <path d="m185 392 32-64 32 64 32-64 32 64M370 392l32-64 32 64 32-64 32 64M313 104l27-26 27 26M340 78V57M330 64h20M141 432l-9 14M540 432l9 14M222 432l-17 27M458 432l17 27" />
        {[0, 1].map((side) => (
          <g
            key={side}
            transform={side ? "translate(680 0) scale(-1 1)" : undefined}
          >
            <path d="M126 422C105 350 127 282 147 242C172 190 179 153 215 128M114 369C89 321 63 299 38 293M132 299C91 271 92 232 74 208M153 223C128 184 133 155 111 125M177 171C202 167 221 145 237 114M111 426C78 396 57 369 49 345" />
            {[
              [120, 394],
              [105, 365],
              [90, 342],
              [66, 316],
              [40, 295],
              [117, 329],
              [134, 290],
              [112, 277],
              [94, 253],
              [78, 218],
              [148, 248],
              [154, 219],
              [138, 194],
              [129, 160],
              [115, 137],
              [166, 189],
              [182, 161],
              [205, 146],
              [225, 123],
              [92, 406],
              [65, 380],
              [50, 350],
              [168, 233],
              [164, 278],
              [103, 302],
            ].map(([x, y], i) => (
              <g
                key={i}
                transform={`translate(${x} ${y}) rotate(${i % 2 ? -35 : 35})`}
              >
                <path
                  d="M0 0c-17-1-23-14-20-26C-5-23 2-12 0 0Zm1-1c14-5 22-19 16-30C3-23-1-12 1-1Z"
                  fill="currentColor"
                  fillOpacity=".035"
                />
                <path d="m-2-3-13-17M3-5l10-20" opacity=".45" />
              </g>
            ))}
            {[
              [116, 316],
              [151, 258],
              [167, 180],
              [96, 379],
              [212, 129],
            ].map(([x, y]) => (
              <g key={x} transform={`translate(${x} ${y})`}>
                <path
                  d="M0-3C-14-19-21 0-6 4C-21 12-4 23 1 9C10 23 24 6 9 2C23-8 7-20 0-3Z"
                  fill="var(--lj-paper, #f5f0df)"
                />
                <circle r="3" cy="3" />
              </g>
            ))}
            <path d="M21 430q16-30 26 0q18-48 29 0q18-22 29 0M55 435l17-16M126 430q-6-28-25-23M74 436h51" />
          </g>
        ))}
      </g>
    </svg>
  );
}

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

export function OvalCrest() {
  return (
    <div className="lj-opening-crest relative w-[clamp(180px,21vw,300px)] aspect-[220/300] lj-mobile:h-[86%] lj-mobile:w-auto">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 300" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth=".8">
          <ellipse cx="110" cy="150" rx="98" ry="139" />
          <ellipse cx="110" cy="150" rx="92" ry="133" />
          <path d="M74 30q20 13 36-8 16 21 36 8M91 29q-10-17-16-6t22 15m32-9q10-17 16-6t-22 15M74 270q20-13 36 8 16-21 36-8M91 271q-10 17-16 6t22-15m32 9q10 17 16 6t-22-15" />
          <path d="m110 16 4 6-4 7-4-6Zm0 255 4 7-4 6-4-6Z" />
        </g>
      </svg>
      <Monogram />
    </div>
  );
}
