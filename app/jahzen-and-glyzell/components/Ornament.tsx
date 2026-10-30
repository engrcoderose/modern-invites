import styles from "../styles/invitation.module.css";

export function Ornament({ className = "" }: { className?: string }) {
  return <svg aria-hidden="true" className={className} width="160" height="28" viewBox="0 0 160 28" fill="none">
    <path d="M0 14h58m44 0h58M64 14l16-9 16 9-16 9-16-9Z" stroke="currentColor" strokeWidth=".65" />
    <path d="m74 14 6-6 6 6-6 6-6-6Z" stroke="currentColor" strokeWidth=".65" />
  </svg>;
}

export function Monogram() {
  return <div aria-hidden="true" className={`${styles.monogram} relative mx-auto flex items-center justify-center`}>
    <span className={styles.monogramJ}>J</span><span className={styles.monogramG}>G</span>
    <span className={`${styles.monogramDiamond} absolute left-1/2 top-0`} />
    <span className={`${styles.monogramDiamond} absolute bottom-0 left-1/2`} />
  </div>;
}
