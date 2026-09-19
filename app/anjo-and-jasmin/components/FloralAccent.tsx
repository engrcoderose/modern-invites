import Image from "next/image";
import Meadow from "../../joshua-and-bea/assets/images/designs/water-color-flowers.png";
import Cosmos from "../../joshua-and-bea/assets/images/designs/flowers2.png";
import Vine from "../../joshua-and-bea/assets/images/designs/floral-designs.png";
import Blue from "../../joshua-and-bea/assets/images/designs/blue-fower-water-color.png";
import Pink from "../../joshua-and-bea/assets/images/designs/pink-flower-with-leaf.png";
import Daisies from "../../joshua-and-bea/assets/images/designs/small-daisy.png";

import Wildflowers from "../../joshua-and-bea/assets/images/designs/flowers.png";
import Frame from "../../joshua-and-bea/assets/images/designs/flower-frame.png";
import Corner from "../../joshua-and-bea/assets/images/designs/flower-border.png";

import Rose from "../../joshua-and-bea/assets/images/designs/rose-flower.png";
import PinkStem from "../../joshua-and-bea/assets/images/designs/single-flower.png";
import BlueStem from "../../joshua-and-bea/assets/images/designs/single-flower-2.png";
import LilacStem from "../../joshua-and-bea/assets/images/designs/single-flower-3.png";

const artwork = { meadow: Meadow, cosmos: Cosmos, vine: Vine, blue: Blue, pink: Pink, daisies: Daisies, wildflowers: Wildflowers, frame: Frame, corner: Corner, rose: Rose, pinkStem: PinkStem, blueStem: BlueStem, lilacStem: LilacStem };

export default function FloralAccent({ kind, className = "", sizes = "(max-width: 640px) 160px, 320px" }: { kind: keyof typeof artwork; className?: string; sizes?: string }) {
  return <Image src={artwork[kind]} alt="" aria-hidden="true" sizes={sizes} className={`pointer-events-none absolute h-auto select-none ${className}`} />;
}
