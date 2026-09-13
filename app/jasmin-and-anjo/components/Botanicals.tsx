import { cn } from "@/lib/utils";

export default function Botanicals({ className = "" }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none absolute w-[250px]", className)}
      viewBox="0 0 280 480"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#7c8b65" strokeWidth="1.4" strokeLinecap="round">
        <path d="M120 480C99 397 143 350 117 276S72 139 101 38M120 449C147 376 209 293 222 177M114 388C89 325 38 323 28 236M121 320C167 264 160 161 177 111" />
        <path
          d="M107 425C60 389 48 362 63 350C90 356 102 394 107 425Z"
          fill="#b1bd92"
        />
        <path
          d="M132 391C144 350 170 341 183 345C179 367 153 380 132 391Z"
          fill="#c2cba7"
        />
        <path
          d="M113 298C81 275 76 253 80 238C102 246 110 272 113 298Z"
          fill="#a2b185"
        />
        <path
          d="M156 283C163 248 187 239 200 242C193 262 176 277 156 283Z"
          fill="#b8c49d"
        />
        <path
          d="M91 170C67 153 59 125 65 111C85 122 90 148 91 170Z"
          fill="#bbc6a0"
        />
        <path
          d="M96 130C115 110 134 97 143 104C138 124 116 133 96 130Z"
          fill="#a6b88c"
        />
        <path
          d="M203 235C207 210 193 195 185 195C178 213 191 229 203 235Z"
          fill="#b4bf99"
        />
      </g>
      {[
        [101, 40, "#e9adc0", 1.2],
        [177, 112, "#c4b4d5", 0.8],
        [222, 177, "#efc999", 1],
        [28, 236, "#b9d1df", 0.85],
        [118, 277, "#eab6c4", 1],
        [68, 354, "#edcba7", 0.55],
      ].map(([x, y, color, scale], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${scale})`}>
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <ellipse
              key={angle}
              cx="0"
              cy="-14"
              rx="12"
              ry="20"
              transform={`rotate(${angle})`}
              fill={String(color)}
              fillOpacity=".72"
              stroke={String(color)}
              strokeWidth=".7"
            />
          ))}
          <circle r="6" fill="#b29a61" />
          <circle r="3" fill="#ece0b3" />
          {[20, 100, 180, 260].map((angle) => (
            <path
              key={angle}
              d="M0 -9L1 -22"
              transform={`rotate(${angle})`}
              stroke="#fffaf4"
              strokeOpacity=".65"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
