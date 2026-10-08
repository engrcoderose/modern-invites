import Image from "next/image";
import flowerOutline from "../assets/design/flower-outline.png";

export default function StoryFlower() {
  return <Image src={flowerOutline} alt="" aria-hidden="true" sizes="112px" className="mx-auto h-auto w-28" />;
}
