import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import styles from "./invitation-card.module.css";

type Props = {
  image: StaticImageData;
  title: string;
  label: "Opening" | "First screen" | "Hero";
  sizes: string;
  priority: boolean;
  reducedMotion: boolean;
  position: "left" | "right";
};

export default function PhonePreview({ image, title, label, sizes, priority, reducedMotion, position }: Props) {
  return (
    <motion.figure
      className={`absolute top-[22%] w-[31%] ${position === "left" ? "left-[12%]" : "left-[57%]"}`}
      variants={{ rest: { y: 0 }, hover: { y: -6 } }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`${styles.phone} relative aspect-[9/19] rounded-[14%/6.6%] p-[3%]`}>
        <div className="relative h-full w-full overflow-hidden rounded-[11%/5%] bg-black">
          <Image src={image} alt={`${title} — ${label.toLowerCase()} screen`} fill priority={priority} sizes={sizes} className="object-cover object-top" />
          <span aria-hidden="true" className={`${styles.camera} pointer-events-none absolute left-1/2 top-[1.7%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full`} />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-[1.7%] left-1/2 h-[0.7%] w-[32%] -translate-x-1/2 rounded-full bg-white/80 mix-blend-difference" />
        </div>
      </div>
      <figcaption className="mt-2 text-center text-[9px] font-medium leading-4 tracking-wide text-brand-950 sm:text-[10px]">{label}</figcaption>
    </motion.figure>
  );
}
