import { celebration } from "../data/event";
import styles from "../styles/portfolio-preview.module.css";

const [name, age] = celebration.displayName.split(" at ");
const [date, year] = celebration.date.split(", ");

export default function PortfolioPreviewDetails() {
  return (
    <div aria-hidden="true" className={`${styles.details} absolute inset-x-[22%] bottom-[24%] top-[25%] flex flex-col items-center justify-center text-center`}>
      <span className={styles.name}>{name}</span>
      <span className={`${styles.age} mt-[1cqw]`}>at {age}</span>
      <span className={`${styles.message} mt-[4cqw] uppercase`}>A new chapter<br />begins</span>
      <span className={`${styles.date} mt-[5cqw] uppercase`}>{date}<br />{year}</span>
    </div>
  );
}
