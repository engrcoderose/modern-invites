import styles from "../styles/wedding.module.css";

interface Props {
  eyebrow: string;
  title: string;
  secondLine?: string;
  centered?: boolean;
}

export default function SectionHeading({ eyebrow, title, secondLine, centered = false }: Props) {
  return (
    <div data-reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`${styles.eyebrow} mb-5`}>{eyebrow}</p>
      <h2 className={styles.sectionTitle}>{title}{secondLine && <><br /><span>{secondLine}</span></>}</h2>
    </div>
  );
}
