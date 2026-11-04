import Image from "next/image";
import topLeft from "../assets/designs/entourage_flower_top_left.png";
import topRight from "../assets/designs/entourage_flower_top_right.png";
import lowerLeft from "../assets/designs/entourage_lower_left_design.png";
import lowerRight from "../assets/designs/entourage_lower_right_design.png";

const TOP_SIZES = "(min-width: 1000px) 350px, 35vw";
const COLUMN_SIZES = "(min-width: 875px) 280px, 32vw";

export default function EntourageArtwork() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <Image src={topLeft} alt="" sizes={TOP_SIZES} draggable={false} className="absolute -left-2 -top-2 h-auto w-[35%] max-w-[350px]" />
      <Image src={topRight} alt="" sizes={TOP_SIZES} draggable={false} className="absolute -right-2 -top-2 h-auto w-[35%] max-w-[350px]" />
      {/* Offset the 19px transparent bottom padding in each source canvas. */}
      <Image src={lowerLeft} alt="" sizes={COLUMN_SIZES} draggable={false} className="absolute bottom-0 left-0 h-auto w-[32%] max-w-[280px] translate-y-[4.1667%]" />
      <Image src={lowerRight} alt="" sizes={COLUMN_SIZES} draggable={false} className="absolute bottom-0 right-0 h-auto w-[32%] max-w-[280px] translate-y-[3.9337%]" />
    </div>
  );
}
