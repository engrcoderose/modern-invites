import Image from "next/image";
import garden from "../assets/garden-spray.svg";

export default function BotanicalArtwork({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return <Image src={garden} alt="" aria-hidden="true" draggable={false} priority={priority} className={`pointer-events-none select-none ${className}`} />;
}
