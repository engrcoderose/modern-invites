import { ImageIcon } from "lucide-react";
import styles from "../styles/invitation.module.css";

export default function PhotoPlaceholder({ label, dark = false }: { label: string; dark?: boolean }) {
  return <figure className={`${styles.photoPlaceholder} ${dark ? styles.photoPlaceholderDark : ""} flex h-full w-full flex-col items-center justify-center gap-3 px-4 py-8 text-center`}>
    <ImageIcon size={26} strokeWidth={1} aria-hidden="true" />
    <figcaption><span className="block text-xs">{label}</span><span className={`${styles.placeholderNote} mt-2 block`}>Photo to follow</span></figcaption>
  </figure>;
}
