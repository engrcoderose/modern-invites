import Image from "next/image";
import garden from "../assets/garden.webp";

export default function Garden({ priority = false, className = "", sizes = "100vw", onReady }: { priority?: boolean; className?: string; sizes?: string; onReady?: () => void }) {
  return <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true"><Image src={garden} alt="" fill sizes={sizes} priority={priority} className="object-cover" onLoad={onReady} onError={onReady} /></div>;
}
