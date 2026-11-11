import Image from "next/image";
import pinkLilies from "../assets/decorations/pink-lilies.webp";
import pinkBow from "../assets/decorations/pink-bow.webp";
import quillStationery from "../assets/decorations/quill-stationery.webp";
import purpleFlorals from "../assets/decorations/purple-florals.webp";
import butterflyFlorals from "../assets/decorations/butterfly-florals.webp";

const artwork = {
  pinkLilies,
  pinkBow,
  quillStationery,
  purpleFlorals,
  butterflyFlorals,
};

interface Props {
  name: keyof typeof artwork;
  className: string;
  sizes: string;
}

export default function DecorativeArtwork({ name, className, sizes }: Props) {
  return <Image src={artwork[name]} alt="" aria-hidden="true" data-reveal="decoration" sizes={sizes} className={`pointer-events-none h-auto select-none ${className}`} />;
}
