import styles from "../styles/invitation.module.css";

export default function CountdownFlourish({ className = "" }: { className?: string }) {
  return <svg aria-hidden="true" className={`${styles.countdownFlourish} ${className}`} width="220" height="20" viewBox="0 0 220 20" fill="none">
    <path d="M0 10h94m32 0h94" stroke="currentColor" strokeWidth=".6" />
    <path d="m110 1 3 6 7 3-7 3-3 6-3-6-7-3 7-3 3-6Z" fill="currentColor" />
  </svg>;
}
