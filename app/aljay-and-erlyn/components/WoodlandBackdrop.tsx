import Image from "next/image";
import woodland from "../../../public/leslie-and-serj/images/woodland-lake.png";
import styles from "../styles/wedding.module.css";

export default function WoodlandBackdrop({ priority = false, onReady }: { priority?: boolean; onReady?: () => void }) {
  return <div className={`${styles.woodland} pointer-events-none absolute inset-0`} aria-hidden="true"><Image src={woodland} alt="" fill priority={priority} sizes="100vw" className="object-cover" onLoad={onReady} onError={onReady} /></div>;
}
