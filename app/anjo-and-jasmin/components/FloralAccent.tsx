import Image from "next/image";
import Meadow from "../../jasmin-and-anjo/assets/images/designs/water-color-flowers.png";
import Cosmos from "../../jasmin-and-anjo/assets/images/designs/flowers2.png";
import Vine from "../../jasmin-and-anjo/assets/images/designs/floral-designs.png";
import Blue from "../../jasmin-and-anjo/assets/images/designs/blue-fower-water-color.png";
import Pink from "../../jasmin-and-anjo/assets/images/designs/pink-flower-with-leaf.png";
import Daisies from "../../jasmin-and-anjo/assets/images/designs/small-daisy.png";

import Wildflowers from "../../jasmin-and-anjo/assets/images/designs/flowers.png";
import Frame from "../../jasmin-and-anjo/assets/images/designs/flower-frame.png";
import Corner from "../../jasmin-and-anjo/assets/images/designs/flower-border.png";

import Rose from "../../jasmin-and-anjo/assets/images/designs/rose-flower.png";
import PinkStem from "../../jasmin-and-anjo/assets/images/designs/single-flower.png";
import BlueStem from "../../jasmin-and-anjo/assets/images/designs/single-flower-2.png";
import LilacStem from "../../jasmin-and-anjo/assets/images/designs/single-flower-3.png";

const artwork = { meadow: Meadow, cosmos: Cosmos, vine: Vine, blue: Blue, pink: Pink, daisies: Daisies, wildflowers: Wildflowers, frame: Frame, corner: Corner, rose: Rose, pinkStem: PinkStem, blueStem: BlueStem, lilacStem: LilacStem };

export default function FloralAccent({ kind, className = "", sizes = "(max-width: 640px) 160px, 320px" }: { kind: keyof typeof artwork; className?: string; sizes?: string }) {
  return <Image src={artwork[kind]} alt="" aria-hidden="true" sizes={sizes} className={`pointer-events-none absolute h-auto select-none ${className}`} />;
}
