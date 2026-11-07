import Image from "next/image";
import flowers from "../assets/designs/countdown-new-bg.png";

// Layout crops preserve the supplied petals' proportions at every screen size.
const corners = [
  { name: "upper-left", left: 0, top: 0, width: 450, height: 360, position: "left-0 top-0 w-[40%] sm:w-[32.94%]" },
  { name: "upper-right", left: 1200, top: 0, width: 166, height: 180, position: "right-0 top-0 w-[16%] sm:w-[12.15%]" },
  { name: "lower-left", left: 0, top: 580, width: 170, height: 179, position: "bottom-0 left-0 w-[16%] sm:w-[12.45%]" },
  { name: "lower-right", left: 900, top: 420, width: 466, height: 339, position: "bottom-0 right-0 w-[40%] sm:w-[34.11%]" },
] as const;

export default function CountdownFlowers() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      {corners.map(corner => (
        <div key={corner.name} className={`absolute overflow-hidden ${corner.position}`} style={{ aspectRatio: `${corner.width} / ${corner.height}` }}>
          <Image src={flowers} alt="" draggable={false} sizes="(max-width: 639px) 135vw, 100vw" className="absolute max-w-none" style={{
            width: `${flowers.width / corner.width * 100}%`,
            height: "auto",
            left: `${-corner.left / corner.width * 100}%`,
            top: `${-corner.top / corner.height * 100}%`,
          }} />
        </div>
      ))}
    </div>
  );
}
