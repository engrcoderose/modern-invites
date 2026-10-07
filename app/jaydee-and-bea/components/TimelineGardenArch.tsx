const sideLeafHeights = Array.from({ length: 15 }, (_, index) => 365 + index * 48);
const crownLeafAngles = Array.from({ length: 19 }, (_, index) => 9 + index * 9);

function Leaves({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d="M0 0C-10-4-15-17-12-24C-1-21 5-10 0 0Z" fill="#91aa82" />
      <path d="M0 0C10-4 16-16 13-24C1-21-5-10 0 0Z" fill="#c0d2ab" />
      <path d="M-9-20L0 0L10-20" stroke="#718664" strokeWidth=".7" strokeOpacity=".55" />
    </g>
  );
}

/** A flexible decorative trellis, sized to the complete event list. */
export default function TimelineGardenArch() {
  return (
    <svg viewBox="0 0 600 1100" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false" className="pointer-events-none absolute inset-0 h-full w-full">
      <path d="M52 1080V315C52 165 153 52 300 52C447 52 548 165 548 315V1080Z" fill="#fffaf3" fillOpacity=".35" />
      <g stroke="#7f9275" strokeOpacity=".6" strokeWidth="1.5">
        <path d="M43 1080V315C43 158 149 38 300 38C451 38 557 158 557 315V1080" />
        <path d="M61 1080V315C61 171 159 66 300 66C441 66 539 171 539 315V1080" />
        {[340, 460, 580, 700, 820, 940, 1060].map((y) => (
          <g key={y}>
            <path d={`M43 ${y}L61 ${y + 38}M61 ${y}L43 ${y + 38}M539 ${y}L557 ${y + 38}M557 ${y}L539 ${y + 38}`} />
          </g>
        ))}
      </g>
      <g stroke="#6e865d" strokeWidth="2" strokeOpacity=".7" strokeLinecap="round">
        <path d="M51 1080C32 1024 70 1005 51 950S70 869 50 818S69 733 51 680S71 599 50 546S68 463 51 410C42 370 63 348 52 312C47 176 156 54 300 51C444 54 553 176 548 312C537 348 558 370 549 410C532 463 550 493 549 546S529 627 549 680S531 767 550 818S530 896 549 950S568 1024 549 1080" />
      </g>
      {sideLeafHeights.map((y, index) => (
        <g key={y}>
          <Leaves x={index % 2 ? 54 : 47} y={y} angle={index % 2 ? -55 : -80} />
          <Leaves x={index % 2 ? 546 : 553} y={y} angle={index % 2 ? 55 : 80} />
        </g>
      ))}
      {crownLeafAngles.map((angle) => {
        const radians = angle * Math.PI / 180;
        return <Leaves key={angle} x={300 + 249 * Math.cos(radians)} y={312 - 258 * Math.sin(radians)} angle={90 - angle} />;
      })}
    </svg>
  );
}
