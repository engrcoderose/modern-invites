import { Ornament } from "./artwork";
import styles from "../styles/invitation.module.css";

export default function SectionHeading({ title, className = "", serif = false }: { title: string; className?: string; serif?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-5 ${className}`}>
      <h2 className={serif ? styles.serifTitle : styles.sectionTitle}>{title}</h2>
      <Ornament className="h-7 w-[130px]" />
    </div>
  );
}
